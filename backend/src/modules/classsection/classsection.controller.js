const asyncHandler = require('../../utils/asyncHandler');
const classSectionService = require('./classsection.service');

const createRegistration = asyncHandler(async (req, res) => {
  const reg = await classSectionService.createRegistration(req.body);
  res.status(201).json({ success: true, data: reg });
});

const listRegistrations = asyncHandler(async (req, res) => {
  const regs = await classSectionService.listRegistrations();
  res.json({ success: true, data: regs });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await classSectionService.getTotals();
  res.json({ success: true, data: totals });
});

const deleteRegistration = asyncHandler(async (req, res) => {
  await classSectionService.deleteRegistration(req.params.id);
  res.json({ success: true, message: 'Registration deleted' });
});

module.exports = { createRegistration, listRegistrations, getTotals, deleteRegistration };