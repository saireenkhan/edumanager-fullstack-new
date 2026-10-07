const asyncHandler = require('../../utils/asyncHandler');
const attendanceService = require('./attendance.service');

const createAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.createAttendance(req.body);
  res.status(201).json({ success: true, data: attendance });
});

const listAttendance = asyncHandler(async (req, res) => {
  const records = await attendanceService.listAttendance();
  res.json({ success: true, data: records });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await attendanceService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createAttendance, listAttendance, getTotals };