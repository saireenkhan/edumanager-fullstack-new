const express = require('express');
const router = express.Router();
const controller = require('./lessonplanning.controller');

router.post('/', controller.createLesson);
router.get('/', controller.listLessons);
router.get('/totals', controller.getTotals);

module.exports = router;