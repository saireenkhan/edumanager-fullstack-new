const mongoose = require('mongoose');

const topicCoverageSchema = new mongoose.Schema(
  {
    topicName: { type: String, required: true, unique: true },
    chapterName: { type: String, required: true },
    subjectName: { type: String, required: true },
    classSection: { type: String, required: true },
    completionPercentage: { type: Number, default: 0 },
    completionDate: { type: String, default: '' },
  },
  { timestamps: true }
);

const TopicCoverage = mongoose.model('TopicCoverage', topicCoverageSchema);
module.exports = TopicCoverage;