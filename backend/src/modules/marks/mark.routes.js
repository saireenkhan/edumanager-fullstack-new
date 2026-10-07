const express = require('express');
const router = express.Router();
const controller = require('./marks.controller');

router.post('/', controller.createMark);
router.get('/', controller.listMarks);
router.get('/totals', controller.getTotals);

module.exports = router;