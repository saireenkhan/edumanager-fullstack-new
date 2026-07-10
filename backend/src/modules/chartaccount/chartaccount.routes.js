const express = require('express');
const router = express.Router();
const controller = require('./chartaccount.controller');

router.post('/', controller.createAccount);
router.get('/', controller.listAccounts);
router.get('/totals', controller.getTotals);

module.exports = router;