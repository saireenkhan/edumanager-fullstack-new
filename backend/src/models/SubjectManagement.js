const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    subjectName: { type: String, required: true },
    subjectCode: { type: String, required: true },
    assignedClass: { type: String, required: true },
    subjectCategory: { type: String, required: true },
    passingPercentage: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    subjectObjectives: { type: String, default: '' },
  },
  { timestamps: true }
);

const SubjectManagement = mongoose.model('SubjectManagement', subjectSchema);
module.exports = SubjectManagement;