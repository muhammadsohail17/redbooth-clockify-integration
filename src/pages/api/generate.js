// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fs = require('fs');
const {
    generateInvoiceData,
    toHoursAndMinutes,
    getLastSundayOfMonth,
    getWeeklyRanges,
    dateToUnixTimestamp,
    unixTimestampToDate
} = require('../../data/util')
import connectDB from '@/data/db';


export default async function handler(req, res) {
    await connectDB();
    const { month, year, userId, hourlyRate, invoiceNo, generatePdf, customItem, customValue } = req.query;
    var data = await generateInvoiceData(month, year, userId, hourlyRate, invoiceNo, customItem, customValue);
    // console.log('Data inside API', data)

    const puppeteer = require("puppeteer")
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

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


