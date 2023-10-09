const fs = require('fs');
const XLSX = require('xlsx');

module.exports = async (data) => {
  const { json_to_sheet: jsonToSheet, book_new: bookNew, book_append_sheet: bookAppendSheet } = XLSX.utils;

  const newDateToIso = new Date().toISOString().split('T')[0];
  const randomNumberByDateNow = Math.floor(Date.now() / 1000);

  const fileDir = './temp/';
  const fileName = `${newDateToIso}${randomNumberByDateNow}.xlsx`;
  const filePath = `${fileDir}${fileName}`;

  const workSheet = jsonToSheet(data);
  const workBook = bookNew();
  bookAppendSheet(workBook, workSheet, `${newDateToIso}${randomNumberByDateNow}`);

  // Create path if it doesn't exist then create xlsx file
  if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });
  XLSX.writeFile(workBook, filePath);

  return { fileName, filePath };
};
