const express = require('express');
const router = express.Router();
const controller = require('./academic.controller');

router.post('/', controller.createClass);
router.get('/', controller.listClasses);
router.get('/totals', controller.getTotals);
router.get('/:id', controller.getClass);
router.put('/:id', controller.updateClass);
router.delete('/:id', controller.deleteClass);

module.exports = router;