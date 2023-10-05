const express = require('express');

const SpreadSheetRouter = require('./routes/SpreadsheetRouter');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  routes() {
    this.server.use('/spreadsheet', SpreadSheetRouter);
  }

  middleware() {
    this.server.use(express.json());
  }
}

module.exports = new App().server;
