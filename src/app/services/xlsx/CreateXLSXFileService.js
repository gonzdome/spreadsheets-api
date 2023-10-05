const XLSX = require('xlsx');

module.exports = async (data) => {
  const { json_to_sheet: jsonToSheet, book_new: bookNew, book_append_sheet: bookAppendSheet } = XLSX.utils;

  const newDateToIso = new Date().toISOString().split('T')[0];
  const randomNumberByDateNow = Math.floor(Date.now() / 1000);

  const workSheet = jsonToSheet(data);
  const workBook = bookNew();
  bookAppendSheet(workBook, workSheet, `${newDateToIso}_${randomNumberByDateNow}`);

  const fileDirectory = `./temp/${newDateToIso}_${randomNumberByDateNow}.xlsx`;
  XLSX.writeFile(workBook, fileDirectory);

  return fileDirectory;
};
