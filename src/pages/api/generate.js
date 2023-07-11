// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// const fs = require('fs');
// const {
//   generateInvoiceData,
//   toHoursAndMinutes,
//   getLastSundayOfMonth,
//   getWeeklyRanges,
//   dateToUnixTimestamp,
//   unixTimestampToDate
// } = require('../../data/util')
// import connectDB from '@/data/db';

// export default async function handler(req, res) {
//   await connectDB();

//   const { month, year, userId, hourlyRate, invoiceNo, generatePdf, customItem, customValue } = req.body;

//   var data = await generateInvoiceData(month, year, userId, hourlyRate, invoiceNo, customItem, customValue);
//   console.log('Data!', data)

//   res.status(200).json({ data: data });

// }
