const mongoose = require('mongoose');

const subjectAssignmentSchema = new mongoose.Schema(
  {
    subjectName: { type: String, required: true },
    classCode: { type: String, required: true, unique: true },
    classSection: { type: String, required: true },
    assignedTeacher: { type: String, required: true },
    weeklyHours: { type: String, required: true },
  },
  { timestamps: true }
);

const SubjectAssignment = mongoose.model('SubjectAssignment', subjectAssignmentSchema);
module.exports = SubjectAssignment;