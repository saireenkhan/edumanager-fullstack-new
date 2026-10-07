const mongoose = require('mongoose');

const lessonPlanningSchema = new mongoose.Schema(
  {
    topicName: { type: String, required: true, unique: true },
    objective: { type: String, required: true },
    subjectName: { type: String, required: true },
    classSection: { type: String, required: true },
    scheduledDate: { type: String, required: true },
    weekTerm: { type: String, required: true },
  },
  { timestamps: true }
);

const LessonPlanning = mongoose.model('LessonPlanning', lessonPlanningSchema);
module.exports = LessonPlanning;