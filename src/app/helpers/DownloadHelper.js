// eslint-disable-next-line no-unused-vars
const zip = require('express-zip');
const fs = require('fs/promises');

module.exports = async (response, download) => {
  response.status(200).zip(download.fileObjects, download.spreadsheetName, () => {
    download.fileObjects.forEach(async file => {
      await fs.unlink(file.path);
    });
  });
};
