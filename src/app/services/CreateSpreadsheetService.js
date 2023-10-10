const { XLSX, CSV } = require('../../utils/SpreadsheetsTypes');
const SpreadsheetModel = require('../models/SpreadsheetModel');
const CreateCSVFileService = require('./csv/CreateCSVFileService');
const CreateXLSXFileService = require('./xlsx/CreateXLSXFileService');

module.exports = async (types, data) => {
  const xlsx = types.includes(XLSX) ? await CreateXLSXFileService(data) : false;
  const csv = types.includes(CSV) ? await CreateCSVFileService(data) : false;

  const fileName = {};
  if (xlsx?.fileName) fileName.xlsx = xlsx;
  if (csv?.fileName) fileName.csv = csv;

  const fileType = { xlsx: !!xlsx, csv: !!csv };
  const fileData = { file_type: fileType, data };

  const findSpreadsheet = await SpreadsheetModel.findOne(fileData);
  if (!findSpreadsheet) await SpreadsheetModel.create({ file: fileName, ...fileData });

  return { xlsx, csv };
};
