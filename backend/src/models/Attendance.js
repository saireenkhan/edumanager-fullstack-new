const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    rollNo: { type: String, required: true },
    classSection: { type: String, required: true },
    subjectName: { type: String, required: true },
    dateLogged: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

attendanceSchema.index({ rollNo: 1, dateLogged: 1, subjectName: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;