const ResultGeneration = require('../../models/ResultGeneration');
const ApiError = require('../../utils/ApiError');

async function createResult(data) {
  const exists = await ResultGeneration.findOne({
    rollNo: data.rollNo,
    termName: data.termName,
  });
  if (exists) throw new ApiError(409, 'Result already exists for this student in this term');

  return ResultGeneration.create(data);
}

async function listResults() {
  return ResultGeneration.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await ResultGeneration.countDocuments();
  const all = await ResultGeneration.find({}, { percentage: 1 });
  const avgPercentage = total > 0
    ? Math.round(all.reduce((sum, r) => sum + r.percentage, 0) / total)
    : 0;
  const passing = await ResultGeneration.countDocuments({ percentage: { $gte: 40 } });
  return { total, avgPercentage, passing };
}

module.exports = { createResult, listResults, getTotals };