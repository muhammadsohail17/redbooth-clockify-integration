
const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {
        hours,
        minutes,
        totalTime: `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
    };
}

const getLastSundayOfMonth = (month, year, shiftDays = null) => {
    // Create a new date object for the first day of the next month
    var firstDayOfNextMonth = new Date(year, month - 1 + 1, 1);
    // Subtract one day to get the last day of the current month
    var lastDayOfMonth = new Date(firstDayOfNextMonth - 24 * 60 * 60 * 1000);
    // Find the day of the week for the last day of the month (0 - Sunday, 1 - Monday, etc.)
    var lastDayOfWeek = lastDayOfMonth.getDay();
    // Calculate the number of days to subtract to get the last Sunday
    var daysToSubtract = (lastDayOfWeek + 7 - 0) % 7;
    // Subtract the number of days to get the last Sunday of the month
    var lastSundayOfMonth = new Date(lastDayOfMonth - daysToSubtract * 24 * 60 * 60 * 1000);
    // Set the time to the end of the day (23:59:59)
    lastSundayOfMonth.setHours(23, 59, 59);
    // Check if shift days is set then shift the date by shift days
    if (shiftDays) {
        lastSundayOfMonth.setDate(lastSundayOfMonth.getDate() + shiftDays);
    }
    return lastSundayOfMonth;
}

const getWeeklyRanges = (startDate, endDate) => {
    const weeklyRanges = [];
    // Adjust the startDate to the nearest Monday
    startDate = new Date(startDate);
    const startDay = startDate.getDay();
    const diff = startDate.getDate() - startDay + (startDay === 0 ? -6 : 1);
    startDate.setDate(diff);
    while (startDate <= endDate) {
        const rangeStart = new Date(startDate);
        rangeStart.setHours(0, 0, 0);
        const rangeEnd = new Date(startDate);
        rangeEnd.setDate(rangeStart.getDate() + 6);
        rangeEnd.setHours(23, 59, 59);
        // Format the dates as strings
        const formattedStart = rangeStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const formattedEnd = rangeEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        weeklyRanges.push({
            range: `${formattedStart} to ${formattedEnd}`,
            rangeStart: dateToUnixTimestamp(rangeStart),
            rangeEnd: dateToUnixTimestamp(rangeEnd)
        });
        // Increment startDate for the next week
        startDate.setDate(startDate.getDate() + 7);
    }
    return weeklyRanges;
}


const dateToUnixTimestamp = (date) => {
    return Math.floor(date.valueOf() / 1000);
}

const unixTimestampToDate = (timestamp) => {
    return new Date(timestamp * 1000);
}

const generateInvoiceData = async (month, year, userId, hourlyRate, invoiceNo, customItem = null, customValue = null) => {
    const fs = require("fs")
    const ejs = require("ejs");
    const { User, Task, Project, Logging } = require('../data/dataModel');
    const startDate = getLastSundayOfMonth(month - 1, year, 1);
    const endDate = getLastSundayOfMonth(month, year);
    const invoiceDueDate = getLastSundayOfMonth(month, year);
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30);
    const weeklyRanges = getWeeklyRanges(startDate, endDate);
    const projects = await Project.find().lean();
    const user = await User.findOne({ rbUserId: userId }, { password: 0 }).lean();
    // console.log('User', user)
    const loggings = await Logging.find({ rbUserId: userId }).sort({ createdAt: 'desc' }).exec();

    var totalLoggedHours = 0;
    var loggingsData = [];
    if (loggings.length) {
        for (const project of projects) {
            var projectLoggingsData = [];
            for (const weeklyRange of weeklyRanges) {
                var weeklyLoggingsData = [];
                var weeklyTotalLoggedHours = 0;
                for (const logging of loggings) {
                    var loggingDate = dateToUnixTimestamp(new Date(logging.timeTrackingOn));
                    if (loggingDate > weeklyRange.rangeStart && loggingDate < weeklyRange.rangeEnd) {
                        const task = await Task.findOne({ rbTaskId: logging.rbTaskId }).exec();
                        if (task.rbProjectId == project.rbProjectId) {
                            weeklyLoggingsData.push({
                                rbCommentId: logging.rbCommentId,
                                rbProjectId: task.rbProjectId,
                                rbProjectName: project.name,
                                rbTaskId: logging.rbTaskId,
                                rbTaskName: task.name,
                                loggingTime: toHoursAndMinutes(logging.minutes).totalTime,
                                loggingDate: unixTimestampToDate(loggingDate).toLocaleDateString("en-US"),
                                loggingTimestamp: loggingDate,
                                createdAtDate: unixTimestampToDate(logging.createdAt)
                            });
                            totalLoggedHours += logging.minutes;
                            weeklyTotalLoggedHours += logging.minutes;
                        }
                    }
                }
                if (weeklyLoggingsData.length) {
                    projectLoggingsData.push({
                        ...weeklyRange,
                        weeklyTotalLoggedHours: toHoursAndMinutes(weeklyTotalLoggedHours).totalTime,
                        weeklyTotals: Math.round(((weeklyTotalLoggedHours / 60) * hourlyRate) * 100) / 100,
                        weeklyLoggingsData
                    });
                }
            }
            if (projectLoggingsData.length) {
                loggingsData.push({
                    ...project,
                    projectLoggingsData
                })
            }
        }
    }
    var data = {
        ...user,
        currency: process.env.CURRENCY,
        companyName: process.env.INVOICE_COMPANY_NAME,
        companyAddress: process.env.INVOICE_COMPANY_ADDRESS,
        month,
        year,
        userId,
        hourlyRate,
        invoiceNo,
        invoiceDate: endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        invoiceDueDate: invoiceDueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        totalLoggedHours: toHoursAndMinutes(totalLoggedHours).totalTime,
        monthlyTotals: ((totalLoggedHours / 60) * hourlyRate),
        loggingsData
    }

    if (customItem && customValue) {
        var customItems = [];
        if (typeof customItem == 'object' && typeof customValue == 'object') {
            for (let i = 0; i < customItem.length; i++) {
                if (customItem[i] && customValue[i]) {
                    customItems.push({
                        item: customItem[i],
                        value: customValue[i]
                    });
                    data.monthlyTotals += parseFloat(customValue[i]);
                }
            }
        } else {
            customItems.push({
                item: customItem,
                value: customValue
            });
            data.monthlyTotals += parseFloat(customValue);
        }
        data.customItems = customItems;
    }

    data.monthlyTotals = Math.round(data.monthlyTotals * 100) / 100;

    const invoiceTemplate = fs.readFileSync('./src/data/invoiceTemplate.ejs', 'utf-8');
    data.renderedInvoiceTemplate = ejs.render(invoiceTemplate, { data });
    return data;
}

// const generatePdfInvoice = async (invoiceData) => {
//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();
//     await page.setContent(invoiceData.renderedInvoiceTemplate, { waitUntil: 'domcontentloaded' });
//     // To reflect CSS used for screens instead of print
//     await page.emulateMediaType('screen');
//     //await page.screenshot({path: "canvas.png"})
//     var invoiceFile = `./invoices/${invoiceData.invoiceNo} - ${invoiceData.name} - ${invoiceData.invoiceDate}.pdf`;
//     let height = await page.evaluate(() => document.documentElement.offsetHeight);
//     await page.pdf({
//         path: invoiceFile,
//         height: height + 'px'
//     });
//     await browser.close();
//     return invoiceFile;
// }

module.exports = {
    generateInvoiceData,
    // generatePdfInvoice,
    toHoursAndMinutes,
    getLastSundayOfMonth,
    getWeeklyRanges,
    dateToUnixTimestamp,
    unixTimestampToDate
}