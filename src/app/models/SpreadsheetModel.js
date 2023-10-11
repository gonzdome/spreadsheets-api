const { Schema, model } = require('mongoose');

const SpreadsheetSchema = new Schema({
  file_type: {
    xlsx: Boolean,
    csv: Boolean
  },
  file: {
    xlsx: { fileName: String, filePath: String },
    csv: { fileName: String, filePath: String }
  },
  data: { type: Schema.Types.Mixed }
});

module.exports = model('Spreadsheet', SpreadsheetSchema);
