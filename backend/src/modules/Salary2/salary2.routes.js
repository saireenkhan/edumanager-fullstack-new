const express = require('express');
const router = express.Router();
const controller = require('./salary2.controller');

router.post('/', controller.createSalary);
router.get('/', controller.listSalaries);
router.get('/totals', controller.getTotals);

module.exports = router;