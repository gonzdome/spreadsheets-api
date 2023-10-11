const SpreadsheetModel = require('../models/SpreadsheetModel');
const CreateCSVFileService = require('./csv/CreateCSVFileService');
const CreateXLSXFileService = require('./xlsx/CreateXLSXFileService');
const { XLSX, CSV } = require('../../utils/FileTypes');

module.exports = async (fileName, types, data) => {
  // fileName is optional, if its passed as a param a document with the desired fileName will be searched
  // The data used will be from the document found.
  if (fileName) {
    const spreadsheet = await SpreadsheetModel.findOne({ $or: [{ 'file.xlsx.fileName': fileName }, { 'file.csv.fileName': fileName }] });
    if (spreadsheet) {
      data = spreadsheet.data;
      types = spreadsheet.file_types;
    }
  }

  const xlsx = types.includes(XLSX) ? await CreateXLSXFileService(fileName, data) : false;
  const csv = types.includes(CSV) ? await CreateCSVFileService(fileName, data) : false;

  const file = {};
  if (xlsx?.fileName) file.xlsx = xlsx;
  if (csv?.fileName) file.csv = csv;

  const fileData = { file_types: types, data };

  const findSpreadsheet = await SpreadsheetModel.findOne(fileData);
  if (!findSpreadsheet) await SpreadsheetModel.create({ file, ...fileData });

  return { xlsx, csv };
};
