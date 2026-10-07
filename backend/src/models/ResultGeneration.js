const mongoose = require('mongoose');

const resultGenerationSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    rollNo: { type: String, required: true },
    classSection: { type: String, required: true },
    percentage: { type: Number, required: true },
    gpa: { type: String, required: true },
    termName: { type: String, required: true },
  },
  { timestamps: true }
);

resultGenerationSchema.index({ rollNo: 1, termName: 1 }, { unique: true });

const ResultGeneration = mongoose.model('ResultGeneration', resultGenerationSchema);
module.exports = ResultGeneration;