const Examination2 = require('../../models/Examination2');
const ApiError = require('../../utils/ApiError');

async function createExamination(data) {
  const exists = await Examination2.findOne({
    $or: [
      { examTitle: data.examTitle },
      { termShortName: data.termShortName }
    ]
  });
  if (exists) throw new ApiError(409, 'Exam title or term short name already exists');

  return Examination2.create(data);
}

async function listExaminations() {
  return Examination2.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await Examination2.countDocuments();
  const monthly = await Examination2.countDocuments({ examCategory: 'Monthly Test' });
  const midTerm = await Examination2.countDocuments({ examCategory: 'Mid Term' });
  const finalTerm = await Examination2.countDocuments({ examCategory: 'Final Term' });
  return { total, monthly, midTerm, finalTerm };
}

module.exports = { createExamination, listExaminations, getTotals };