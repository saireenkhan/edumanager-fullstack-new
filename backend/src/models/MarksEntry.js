const mongoose = require('mongoose');

const marksEntrySchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    rollNo: { type: String, required: true },
    classSection: { type: String, required: true },
    subjectName: { type: String, required: true },
    assessmentType: { type: String, required: true },
    obtainedMarks: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
  },
  { timestamps: true }
);

marksEntrySchema.index({ rollNo: 1, subjectName: 1, assessmentType: 1 }, { unique: true });

const MarksEntry = mongoose.model('MarksEntry', marksEntrySchema);
module.exports = MarksEntry;