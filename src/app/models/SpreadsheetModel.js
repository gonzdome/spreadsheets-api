const { Schema, model } = require('mongoose');

const SpreadsheetSchema = new Schema({
  file_types: { type: Array },
  file: {
    xlsx: { fileName: String, filePath: String },
    csv: { fileName: String, filePath: String }
  },
  data: { type: Schema.Types.Mixed }
});

module.exports = model('Spreadsheet', SpreadsheetSchema);
