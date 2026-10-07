const asyncHandler = require('../../utils/asyncHandler');
const depart2Service = require('./depart2.service');

const createDepart = asyncHandler(async (req, res) => {
  const depart = await depart2Service.createDepart(req.body);
  res.status(201).json({ success: true, data: depart });
});

const listDeparts = asyncHandler(async (req, res) => {
  const departs = await depart2Service.listDeparts();
  res.json({ success: true, data: departs });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await depart2Service.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createDepart, listDeparts, getTotals };