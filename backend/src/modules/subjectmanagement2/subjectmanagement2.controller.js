const asyncHandler = require('../../utils/asyncHandler');
const subjectService2 = require('./subjectmanagement2.service');

const createSubject = asyncHandler(async (req, res) => {
  const subject = await subjectService2.createSubject(req.body);
  res.status(201).json({ success: true, data: subject });
});

const listSubjects = asyncHandler(async (req, res) => {
  const subjects = await subjectService2.listSubjects();
  res.json({ success: true, data: subjects });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await subjectService2.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createSubject, listSubjects, getTotals };