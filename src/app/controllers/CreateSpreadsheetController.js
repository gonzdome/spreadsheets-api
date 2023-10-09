const { XLSX, CSV } = require('../../utils/SpreadsheetsTypes');
const ResponseHelper = require('../helpers/ResponseHelper');
const CreateCSVFileService = require('../services/csv/CreateCSVFileService');
const CreateXLSXFileService = require('../services/xlsx/CreateXLSXFileService');
const CreateSpreadsheetValidator = require('../validator/CreateSpreadsheetValidator');

module.exports = async (request, response) => {
  const { API_URL } = process.env;

  try {
    await CreateSpreadsheetValidator(request.body);

    const { types = 'xlsx', data } = request.body;

    const xlsx = types.includes(XLSX) ? await CreateXLSXFileService(data) : '';
    const csv = types.includes(CSV) ? await CreateCSVFileService(data) : '';

    await ResponseHelper({
      response,
      success: true,
      status: 200,
      data: {
        message: 'To download the desired files, click the link bellow',
        url: `${API_URL}/spreadsheet/download`,
        files: { xlsx, csv }
      }
    });
  } catch (error) {
    await ResponseHelper({ response, success: false, status: 400, data: error.message ?? error });
  }
};
