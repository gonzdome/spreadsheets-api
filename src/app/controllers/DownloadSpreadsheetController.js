const ResponseHelper = require('../helpers/ResponseHelper');
const DownloadSpreadsheetService = require('../services/DownloadSpreadsheetService');
const DownloadHelper = require('../helpers/DownloadHelper');

module.exports = async (request, response) => {
  try {
    const download = await DownloadSpreadsheetService();

    await DownloadHelper(response, download);
  } catch (error) {
    await ResponseHelper({ response, success: false, status: 400, data: error.message ?? error });
  }
};
