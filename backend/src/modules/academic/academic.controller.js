const asyncHandler = require('../../utils/asyncHandler');
const academicService = require('./academic.service');

const createClass = asyncHandler(async (req, res) => {
  const cls = await academicService.createClass(req.body);
  res.status(201).json({ success: true, data: cls });
});

const listClasses = asyncHandler(async (req, res) => {
  const classes = await academicService.listClasses();
  res.json({ success: true, data: classes });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await academicService.getTotals();
  res.json({ success: true, data: totals });
});

const getClass = asyncHandler(async (req, res) => {
  const cls = await academicService.getClassById(req.params.id);
  res.json({ success: true, data: cls });
});

const updateClass = asyncHandler(async (req, res) => {
  const cls = await academicService.updateClass(req.params.id, req.body);
  res.json({ success: true, data: cls });
});

const deleteClass = asyncHandler(async (req, res) => {
  await academicService.deleteClass(req.params.id);
  res.json({ success: true, message: 'Class deleted' });
});

module.exports = { createClass, listClasses, getTotals, getClass, updateClass, deleteClass };