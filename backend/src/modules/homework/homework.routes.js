const express = require('express');
const router = express.Router();
const controller = require('./homework.controller');

router.post('/', controller.createHomework);
router.get('/', controller.listHomework);
router.get('/totals', controller.getTotals);

module.exports = router;