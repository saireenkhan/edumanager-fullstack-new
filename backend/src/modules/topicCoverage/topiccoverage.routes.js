const express = require('express');
const router = express.Router();
const controller = require('./topiccoverage.controller');

router.post('/', controller.createTopic);
router.get('/', controller.listTopics);
router.get('/totals', controller.getTotals);

module.exports = router;