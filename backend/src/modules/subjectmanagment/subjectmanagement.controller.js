const asyncHandler = require('../../utils/asyncHandler');
const subjectService = require('./subjectmanagement.service');

const createSubject = asyncHandler(async (req, res) => {
  const subject = await subjectService.createSubject(req.body);
  res.status(201).json({ success: true, data: subject });
});

const listSubjects = asyncHandler(async (req, res) => {
  const subjects = await subjectService.listSubjects();
  res.json({ success: true, data: subjects });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await subjectService.getTotals();
  res.json({ success: true, data: totals });
});

const deleteSubject = asyncHandler(async (req, res) => {
  await subjectService.deleteSubject(req.params.id);
  res.json({ success: true, message: 'Subject deleted' });
});

module.exports = { createSubject, listSubjects, getTotals, deleteSubject };