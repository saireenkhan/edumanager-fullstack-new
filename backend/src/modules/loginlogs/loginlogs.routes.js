const express = require('express');
const loginLogsController = require('./loginlogs.controller');

const router = express.Router();

router.get('/', loginLogsController.getLoginLogs);
router.get('/stats', loginLogsController.getLoginLogStats);

module.exports = router;