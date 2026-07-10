const mongoose = require('mongoose');

const classSectionSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    targetGrade: { type: String, required: true },
    admissionShift: { type: String, required: true },
    guardianContact: { type: String, required: true },
    submittedDocs: { type: String, default: '' },
  },
  { timestamps: true }
);

const ClassSection = mongoose.model('ClassSection', classSectionSchema);
module.exports = ClassSection;