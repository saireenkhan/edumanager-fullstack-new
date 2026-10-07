const express = require('express');
const router = express.Router();
const controller = require('./resultgeneration.controller');

router.post('/', controller.createResult);
router.get('/', controller.listResults);
router.get('/totals', controller.getTotals);

module.exports = router;