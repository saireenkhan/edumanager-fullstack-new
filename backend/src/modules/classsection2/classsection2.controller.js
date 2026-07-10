const asyncHandler = require('../../utils/asyncHandler');
const classSec2Service = require('./classsection2.services');

const createRegistration = asyncHandler(async (req, res) => {
  const reg = await classSec2Service.createRegistration(req.body);
  res.status(201).json({ success: true, data: reg });
});

const listRegistrations = asyncHandler(async (req, res) => {
  const regs = await classSec2Service.listRegistrations();
  res.json({ success: true, data: regs });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await classSec2Service.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createRegistration, listRegistrations, getTotals };