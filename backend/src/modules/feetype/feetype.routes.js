const express = require('express');
const router = express.Router();
const controller = require('./feetype.controller');

router.post('/', controller.createFeeType);
router.get('/', controller.listFeeTypes);
router.get('/totals', controller.getTotals);
router.delete('/:id', controller.deleteFeeType);

module.exports = router;