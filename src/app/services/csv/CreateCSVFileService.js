const fs = require('fs');
const { CSV } = require('../../../utils/FileTypes');

module.exports = async (data) => {
  const { FILE_DIR } = process.env;

  const newDateToIso = new Date().toISOString().split('T')[0];
  const randomNumberByDateNow = Math.floor(Date.now() / 1000);

  const fileName = `${newDateToIso}${randomNumberByDateNow}.${CSV}`;
  const filePath = `${FILE_DIR}${fileName}`;

  const csvHeaders = Object.keys(data[0]).join(',');
  const csvValues = data.map(row => Object.values(row).join(',')).join('\n');
  const csvContent = `${csvHeaders}\n${csvValues}`;

  // Create path if it doesn't exist then create csv file
  if (!fs.existsSync(FILE_DIR)) fs.mkdirSync(FILE_DIR, { recursive: true });
  fs.writeFileSync(filePath, csvContent, 'utf-8');

  return { fileName, filePath };
};
