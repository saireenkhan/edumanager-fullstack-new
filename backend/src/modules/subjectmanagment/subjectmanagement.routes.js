const express = require('express');
const router = express.Router();
const controller = require('./subjectmanagement.controller');

router.post('/', controller.createSubject);
router.get('/', controller.listSubjects);
router.get('/totals', controller.getTotals);
router.delete('/:id', controller.deleteSubject);

module.exports = router;