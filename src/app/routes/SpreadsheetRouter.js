const { Router } = require('express');
const CreateSpreadsheetController = require('../controllers/CreateSpreadsheetController');

const router = Router();

router.post('/generate', CreateSpreadsheetController);

module.exports = router;
