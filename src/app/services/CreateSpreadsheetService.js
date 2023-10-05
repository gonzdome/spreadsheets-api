const CreateXLSXFileService = require('./xlsx/CreateXLSXFileService');
const CreateCSVFileService = require('./csv/CreateCSVFileService');
const { XLSX, CSV } = require('../../utils/SpreadsheetsTypes');

module.exports = async ({ types = 'xlsx', data }) => {
  const xlsx = types.includes(XLSX) ? await CreateXLSXFileService(data) : '';
  const csv = types.includes(CSV) ? await CreateCSVFileService(data) : '';

  return { xlsx, csv };
};
