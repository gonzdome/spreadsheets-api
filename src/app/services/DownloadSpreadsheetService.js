const fs = require('fs');
const path = require('path');
const { RAR } = require('../../utils/FileTypes');

module.exports = async () => {
  const { FILE_DIR } = process.env;

  const newDateToIso = new Date().toISOString().split('T')[0];
  const randomNumberByDateNow = Math.floor(Date.now() / 1000);

  const files = fs.readdirSync(FILE_DIR);
  const fileObjects = files.map(file => ({ path: path.join(FILE_DIR, file), name: file }));

  const spreadsheetName = `${newDateToIso}_${randomNumberByDateNow}.${RAR}`;

  return { fileObjects, spreadsheetName };
};
