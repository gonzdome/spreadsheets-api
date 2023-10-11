const ResponseHelper = require('../helpers/ResponseHelper');
const CreateSpreadsheetService = require('../services/CreateSpreadsheetService');
const CreateSpreadsheetValidator = require('../validator/CreateSpreadsheetValidator');

module.exports = async (request, response) => {
  const { API_URL } = process.env;

  try {
    await CreateSpreadsheetValidator(request.body);

    const { fileName = null, types = 'xlsx', data } = request.body;

    const { xlsx, csv } = await CreateSpreadsheetService(fileName, types, data);

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
