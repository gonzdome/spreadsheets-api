const ResponseHelper = require('../helpers/ResponseHelper');
const CreateSpreadSheetService = require('../services/CreateSpreadsheetService');

module.exports = async (request, response) => {
  try {
    const { types = null, data } = request.body;

    const spreadsheet = await CreateSpreadSheetService({ types, data });

    await ResponseHelper({ response, success: true, status: 200, message: spreadsheet });
  } catch (error) {
    await ResponseHelper({ response, success: false, status: 400, message: error });
  }
};
