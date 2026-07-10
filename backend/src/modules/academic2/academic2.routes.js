const express = require('express');
const router = express.Router();
const controller = require('./academic2.controller');

router.post('/', controller.createClass);
router.get('/', controller.listClasses);
router.get('/totals', controller.getTotals);

module.exports = router;