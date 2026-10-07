const TopicCoverage = require('../../models/TopicCoverage');
const ApiError = require('../../utils/ApiError');

async function createTopic(data) {
  const exists = await TopicCoverage.findOne({ topicName: data.topicName });
  if (exists) throw new ApiError(409, 'Topic name already exists');

  return TopicCoverage.create(data);
}

async function listTopics() {
  return TopicCoverage.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await TopicCoverage.countDocuments();
  const completed = await TopicCoverage.countDocuments({ completionPercentage: 100 });
  const inProgress = await TopicCoverage.countDocuments({ completionPercentage: { $gt: 0, $lt: 100 } });
  const notStarted = await TopicCoverage.countDocuments({ completionPercentage: 0 });
  return { total, completed, inProgress, notStarted };
}

module.exports = { createTopic, listTopics, getTotals };