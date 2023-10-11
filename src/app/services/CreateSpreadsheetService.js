const SpreadsheetModel = require('../models/SpreadsheetModel');
const CreateCSVFileService = require('./csv/CreateCSVFileService');
const CreateXLSXFileService = require('./xlsx/CreateXLSXFileService');
const { XLSX, CSV } = require('../../utils/FileTypes');

module.exports = async (types, data) => {
  const xlsx = types.includes(XLSX) ? await CreateXLSXFileService(data) : false;
  const csv = types.includes(CSV) ? await CreateCSVFileService(data) : false;

  const file = {};
  if (xlsx?.fileName) file.xlsx = { file_name: xlsx.fileName, file_path: xlsx.filePath };
  if (csv?.fileName) file.csv = { file_name: csv.fileName, file_path: csv.filePath };

  const fileData = { file_types: types, data };

  const findSpreadsheet = await SpreadsheetModel.findOne(fileData, { _id: 1 });
  if (!findSpreadsheet) await SpreadsheetModel.create({ file, ...fileData });

  return { xlsx, csv };
};
