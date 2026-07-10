const mongoose = require('mongoose');

const subjectManagement2Schema = new mongoose.Schema(
  {
    subjectName: { type: String, required: true, unique: true },
    subjectCode: { type: String, required: true, unique: true },
    assignedClass: { type: String, required: true },
    subjectCategory: { type: String, required: true },
    passingPercentage: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    subjectObjectives: { type: String, default: '' },
  },
  { timestamps: true }
);

const SubjectManagement2 = mongoose.model('SubjectManagement2', subjectManagement2Schema);
module.exports = SubjectManagement2;