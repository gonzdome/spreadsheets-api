const CreateXLSXFileService = require('./xlsx/CreateXLSXFileService');
const CreateCSVFileService = require('./csv/CreateCSVFileService');
const { XLSX, CSV } = require('../../utils/SpreadsheetsTypes');

module.exports = async ({ types = 'xlsx', data }) => {
  if (types.includes(XLSX)) await CreateXLSXFileService(data);
  if (types.includes(CSV)) await CreateCSVFileService(data);

  return true;
};
