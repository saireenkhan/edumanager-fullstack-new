const asyncHandler = require('../../utils/asyncHandler');
const subjectAssignmentService = require('./subjectassignment.service');

const createAssignment = asyncHandler(async (req, res) => {
  const assignment = await subjectAssignmentService.createAssignment(req.body);
  res.status(201).json({ success: true, data: assignment });
});

const listAssignments = asyncHandler(async (req, res) => {
  const assignments = await subjectAssignmentService.listAssignments();
  res.json({ success: true, data: assignments });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await subjectAssignmentService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createAssignment, listAssignments, getTotals };