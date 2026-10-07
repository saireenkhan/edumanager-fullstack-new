const express = require('express');
const router = express.Router();
const controller = require('./attendance.controller');

router.post('/', controller.createAttendance);
router.get('/', controller.listAttendance);
router.get('/totals', controller.getTotals);

module.exports = router;