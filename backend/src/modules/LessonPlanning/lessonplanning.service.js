const LessonPlanning = require('../../models/LessonPlanning');
const ApiError = require('../../utils/ApiError');

async function createLesson(data) {
  const exists = await LessonPlanning.findOne({ topicName: data.topicName });
  if (exists) throw new ApiError(409, 'Lesson topic already exists');

  return LessonPlanning.create(data);
}

async function listLessons() {
  return LessonPlanning.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await LessonPlanning.countDocuments();
  return { total };
}

module.exports = { createLesson, listLessons, getTotals };