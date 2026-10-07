const asyncHandler = require('../../utils/asyncHandler');
const resultGenerationService = require('./resultgeneration.service');

const createResult = asyncHandler(async (req, res) => {
  const result = await resultGenerationService.createResult(req.body);
  res.status(201).json({ success: true, data: result });
});

const listResults = asyncHandler(async (req, res) => {
  const results = await resultGenerationService.listResults();
  res.json({ success: true, data: results });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await resultGenerationService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createResult, listResults, getTotals };