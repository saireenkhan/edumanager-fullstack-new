const express = require('express');
const router = express.Router();
const controller = require('./examination2.controller');

router.post('/', controller.createExamination);
router.get('/', controller.listExaminations);
router.get('/totals', controller.getTotals);

module.exports = router;