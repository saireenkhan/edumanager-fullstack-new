const express = require('express');
const router = express.Router();
const controller = require('./subjectassignment.controller');

router.post('/', controller.createAssignment);
router.get('/', controller.listAssignments);
router.get('/totals', controller.getTotals);

module.exports = router;