const { Schema, model } = require('mongoose');
const { removeHours } = require('../helpers/HandleDateHelper');

const SpreadsheetSchema = new Schema(
  {
    file_types: { type: Array },
    file: {
      xlsx: { fileName: String, filePath: String },
      csv: { fileName: String, filePath: String }
    },
    data: { type: Array },
    created_at: { type: Date, default: removeHours(new Date(), 3) },
    updated_at: { type: Date, default: removeHours(new Date(), 3) }
  }
);

module.exports = model('Spreadsheet', SpreadsheetSchema);
