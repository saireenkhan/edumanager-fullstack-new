const asyncHandler = require('../../utils/asyncHandler');
const topicCoverageService = require('./topiccoverage.service');

const createTopic = asyncHandler(async (req, res) => {
  const topic = await topicCoverageService.createTopic(req.body);
  res.status(201).json({ success: true, data: topic });
});

const listTopics = asyncHandler(async (req, res) => {
  const topics = await topicCoverageService.listTopics();
  res.json({ success: true, data: topics });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await topicCoverageService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createTopic, listTopics, getTotals };