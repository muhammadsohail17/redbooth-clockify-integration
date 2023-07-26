// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {
    generateInvoiceData,
    toHoursAndMinutes,
    getLastSundayOfMonth,
    getWeeklyRanges,
    dateToUnixTimestamp,
    unixTimestampToDate,
    formatNumber,
    renderedInvoiceData
} = require('../../data/util')
// import connectDB from '@/data/db';
import connectDB from '@/data/db';

export default async function handler(req, res) {
    const fs = require("fs");
    const ejs = require("ejs");
    const puppeteer = require("puppeteer");

    await connectDB();
    const { month, year, userId, hourlyRate, invoiceNo } = req.body.queryData;
    var data = await generateInvoiceData(month, year, userId, hourlyRate, invoiceNo);

    // const invoiceTemplate = fs.readFileSync('./src/data/invoiceTemplate.ejs', 'utf-8');
    const invoiceTemplate = fs.readFileSync('./src/data/template.ejs', 'utf-8');
    data.renderedInvoiceTemplate = ejs.render(invoiceTemplate, { data, invoiceData: req.body.invoiceData });
    console.log("invoiceTemplate", data.renderedInvoiceTemplate)

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        // const htmlCode = '<html><body><h1>Hello World</h1></body></html>'
        // await page.setContent(htmlCode);
        await page.setContent(data.renderedInvoiceTemplate);
        const pdfBuffer = await page.pdf();
        await browser.close();
        // Set the appropriate headers for file download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Invoice.pdf');

        // Send the generated PDF as a response
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('PDF generation failed');
    }
}


