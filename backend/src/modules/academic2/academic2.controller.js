const asyncHandler = require('../../utils/asyncHandler');
const academic2Service = require('./academic2.service');

const createClass = asyncHandler(async (req, res) => {
  const cls = await academic2Service.createClass(req.body);
  res.status(201).json({ success: true, data: cls });
});

const listClasses = asyncHandler(async (req, res) => {
  const classes = await academic2Service.listClasses();
  res.json({ success: true, data: classes });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await academic2Service.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createClass, listClasses, getTotals };