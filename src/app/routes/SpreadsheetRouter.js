const { Router } = require('express');
const CreateSpreadsheetController = require('../controllers/CreateSpreadsheetController');
const DownloadSpreadsheetController = require('../controllers/DownloadSpreadsheetController');

const router = Router();

router.get('/download', DownloadSpreadsheetController);
router.post('/generate', CreateSpreadsheetController);

module.exports = router;
