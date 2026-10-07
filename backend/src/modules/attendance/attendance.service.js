const Attendance = require('../../models/Attendance');
const ApiError = require('../../utils/ApiError');

async function createAttendance(data) {
  const exists = await Attendance.findOne({
    rollNo: data.rollNo,
    dateLogged: data.dateLogged,
    subjectName: data.subjectName,
  });
  if (exists) throw new ApiError(409, 'Attendance already marked for this student on this date and subject');

  return Attendance.create(data);
}

async function listAttendance() {
  return Attendance.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await Attendance.countDocuments();
  const present = await Attendance.countDocuments({ status: 'Present' });
  const absent = await Attendance.countDocuments({ status: 'Absent' });
  const leave = await Attendance.countDocuments({ status: 'Leave' });
  return { total, present, absent, leave };
}

module.exports = { createAttendance, listAttendance, getTotals };