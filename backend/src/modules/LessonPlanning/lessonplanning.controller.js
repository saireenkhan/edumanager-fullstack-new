const asyncHandler = require('../../utils/asyncHandler');
const lessonPlanningService = require('./lessonplanning.service');

const createLesson = asyncHandler(async (req, res) => {
  const lesson = await lessonPlanningService.createLesson(req.body);
  res.status(201).json({ success: true, data: lesson });
});

const listLessons = asyncHandler(async (req, res) => {
  const lessons = await lessonPlanningService.listLessons();
  res.json({ success: true, data: lessons });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await lessonPlanningService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createLesson, listLessons, getTotals };