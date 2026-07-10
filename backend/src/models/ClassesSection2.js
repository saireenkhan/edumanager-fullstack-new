const mongoose = require('mongoose');

const classesSec2Schema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, unique: true },
    targetGrade: { type: String, required: true },
    admissionShift: { type: String, required: true },
    guardianContact: { type: String, required: true },
    submittedDocs: { type: String, default: '' },
  },
  { timestamps: true }
);

const ClassesSection2 = mongoose.model('ClassesSection2', classesSec2Schema);
module.exports = ClassesSection2;