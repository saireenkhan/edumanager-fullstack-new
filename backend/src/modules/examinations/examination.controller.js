const asyncHandler = require('../../utils/asyncHandler');
const examinationService = require('./examination.service');

const createExamination = asyncHandler(async (req, res) => {
  const exam = await examinationService.createExamination(req.body);
  res.status(201).json({ success: true, data: exam });
});

const listExaminations = asyncHandler(async (req, res) => {
  const exams = await examinationService.listExaminations();
  res.json({ success: true, data: exams });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await examinationService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createExamination, listExaminations, getTotals };