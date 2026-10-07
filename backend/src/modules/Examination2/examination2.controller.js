const asyncHandler = require('../../utils/asyncHandler');
const examination2Service = require('./examination2.service');

const createExamination = asyncHandler(async (req, res) => {
  const exam = await examination2Service.createExamination(req.body);
  res.status(201).json({ success: true, data: exam });
});

const listExaminations = asyncHandler(async (req, res) => {
  const exams = await examination2Service.listExaminations();
  res.json({ success: true, data: exams });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await examination2Service.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createExamination, listExaminations, getTotals };