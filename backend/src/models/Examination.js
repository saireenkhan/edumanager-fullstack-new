const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema(
  {
    examTitle: { type: String, required: true, unique: true },
    termShortName: { type: String, required: true, unique: true },
    examCategory: { type: String, required: true },
    resultPublicationDate: { type: String, default: '' },
    weightagePercentage: { type: Number, default: 0 },
    includeInCgpa: { type: String, default: '' },
    showOnParentPortal: { type: String, default: '' },
    instructionalNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

const Examination = mongoose.model('Examination', examinationSchema);
module.exports = Examination;