const fs = require('fs');

module.exports = async (data) => {
  const newDateToIso = new Date().toISOString().split('T')[0];
  const randomNumberByDateNow = Math.floor(Date.now() / 1000);

  const fileDir = './temp/';
  const fileName = `${newDateToIso}${randomNumberByDateNow}.csv`;
  const filePath = `${fileDir}${fileName}`;

  const csvHeaders = Object.keys(data[0]).join(',');
  const csvValues = data.map((row) => Object.values(row).join(',')).join('\n');
  const csvContent = `${csvHeaders}\n${csvValues}`;

  // Create path if it doesn't exist then create csv file
  if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, csvContent, 'utf-8');

  return { fileName, filePath };
};
