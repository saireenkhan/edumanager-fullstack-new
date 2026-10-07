const asyncHandler = require('../../utils/asyncHandler');
const salary2Service = require('./salary2.service');

const createSalary = asyncHandler(async (req, res) => {
  const salary = await salary2Service.createSalary(req.body);
  res.status(201).json({ success: true, data: salary });
});

const listSalaries = asyncHandler(async (req, res) => {
  const salaries = await salary2Service.listSalaries();
  res.json({ success: true, data: salaries });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await salary2Service.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createSalary, listSalaries, getTotals };