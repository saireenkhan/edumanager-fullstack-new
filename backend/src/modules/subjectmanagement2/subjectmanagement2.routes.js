const express = require('express');
const router = express.Router();
const controller = require('./subjectmanagement2.controller');

router.post('/', controller.createSubject);
router.get('/', controller.listSubjects);
router.get('/totals', controller.getTotals);

module.exports = router;