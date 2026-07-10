const express = require('express');
const router = express.Router();
const controller = require('./classsection.controller');

router.post('/', controller.createRegistration);
router.get('/', controller.listRegistrations);
router.get('/totals', controller.getTotals);
router.delete('/:id', controller.deleteRegistration);

module.exports = router;