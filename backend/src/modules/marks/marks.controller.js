const asyncHandler = require('../../utils/asyncHandler');
const marksService = require('./marks.service');

const createMark = asyncHandler(async (req, res) => {
  const mark = await marksService.createMark(req.body);
  res.status(201).json({ success: true, data: mark });
});

const listMarks = asyncHandler(async (req, res) => {
  const marks = await marksService.listMarks();
  res.json({ success: true, data: marks });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await marksService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createMark, listMarks, getTotals };