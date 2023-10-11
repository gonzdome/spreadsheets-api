const SpreadsheetModel = require('../models/SpreadsheetModel');
const CreateCSVFileService = require('./csv/CreateCSVFileService');
const CreateXLSXFileService = require('./xlsx/CreateXLSXFileService');
const { XLSX, CSV } = require('../../utils/FileTypes');

module.exports = async (fileName, types, data) => {
  const xlsx = types.includes(XLSX) ? await CreateXLSXFileService(fileName, data) : false;
  const csv = types.includes(CSV) ? await CreateCSVFileService(fileName, data) : false;

  const file = {};
  if (xlsx?.fileName) file.xlsx = xlsx;
  if (csv?.fileName) file.csv = csv;

  const fileData = { file_types: types, data };
  if (fileName) fileData.fileName = fileName;

  const findSpreadsheet = await SpreadsheetModel.findOne(fileData, { _id: 1 }).lean();
  if (!findSpreadsheet) await SpreadsheetModel.create({ file, ...fileData });

  return { xlsx, csv };
};
