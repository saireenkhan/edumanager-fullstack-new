const asyncHandler = require('../../utils/asyncHandler');
const homeworkService = require('./homework.service');

const createHomework = asyncHandler(async (req, res) => {
  const homework = await homeworkService.createHomework(req.body);
  res.status(201).json({ success: true, data: homework });
});

const listHomework = asyncHandler(async (req, res) => {
  const homeworks = await homeworkService.listHomework();
  res.json({ success: true, data: homeworks });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await homeworkService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createHomework, listHomework, getTotals };