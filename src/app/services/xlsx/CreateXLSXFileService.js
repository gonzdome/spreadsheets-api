const fs = require('fs');
const { writeFile, utils } = require('xlsx');
const { XLSX } = require('../../../utils/FileTypes');

module.exports = async (fileName, data) => {
  const { FILE_DIR } = process.env;
  const { json_to_sheet: jsonToSheet, book_new: bookNew, book_append_sheet: bookAppendSheet } = utils;

  const newDateToIso = new Date().toISOString().split('T')[0];
  const randomNumberByDateNow = Math.floor(Date.now() / 1000);

  if (!fileName) fileName = `${newDateToIso}${randomNumberByDateNow}`;
  const filePath = `${FILE_DIR}${fileName}.${XLSX}`;

  const workSheet = jsonToSheet(data);
  const workBook = bookNew();
  bookAppendSheet(workBook, workSheet, `${newDateToIso}${randomNumberByDateNow}`);

  // Create path if it doesn't exist then create xlsx file
  if (!fs.existsSync(FILE_DIR)) fs.mkdirSync(FILE_DIR, { recursive: true });
  writeFile(workBook, filePath);

  return { fileName, filePath };
};
