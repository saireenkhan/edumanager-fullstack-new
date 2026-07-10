const asyncHandler = require('../../utils/asyncHandler');
const departService = require('./depart.service');

const createDepart = asyncHandler(async (req, res) => {
  const depart = await departService.createDepart(req.body);
  res.status(201).json({ success: true, data: depart });
});

const listDeparts = asyncHandler(async (req, res) => {
  const departs = await departService.listDeparts();
  res.json({ success: true, data: departs });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await departService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createDepart, listDeparts, getTotals };