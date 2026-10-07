const express = require('express');
const router = express.Router();
const controller = require('./depart2.controller');

router.post('/', controller.createDepart);
router.get('/', controller.listDeparts);
router.get('/totals', controller.getTotals);

module.exports = router;