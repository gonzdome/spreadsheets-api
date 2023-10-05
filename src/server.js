const mongoose = require('mongoose');
const app = require('./app/app');
require('dotenv').config();

const { MONGO_DB_URL } = process.env;

mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => app.listen(3000, () => console.log(`Listening on http://localhost:${3000}`)))
  .catch((error) => console.error('Failed to connect with database', error));
