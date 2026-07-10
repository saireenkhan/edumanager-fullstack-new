const asyncHandler = require('../../utils/asyncHandler');
const studentsService = require('./students.service');

// Controller = thin layer. Pull data out of req, call the service, send res.
const createStudent = asyncHandler(async (req, res) => {
  const student = await studentsService.createStudent(req.body, req.scopedSchoolId);
  res.status(201).json({ success: true, data: student });
});

const listStudents = asyncHandler(async (req, res) => {
  const students = await studentsService.listStudents(req.scopedSchoolId, req.query);
  res.json({ success: true, data: students });
});

const getStudent = asyncHandler(async (req, res) => {
  const student = await studentsService.getStudentById(req.params.id, req.scopedSchoolId);
  res.json({ success: true, data: student });
});

module.exports = { createStudent, listStudents, getStudent };
