const Examination = require('../../models/Examination');
const ApiError = require('../../utils/ApiError');

async function createExamination(data) {
  const exists = await Examination.findOne({
    $or: [
      { examTitle: data.examTitle },
      { termShortName: data.termShortName }
    ]
  });
  if (exists) throw new ApiError(409, 'Exam title or term short name already exists');

  return Examination.create(data);
}

async function listExaminations() {
  return Examination.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await Examination.countDocuments();
  const monthly = await Examination.countDocuments({ examCategory: 'Monthly Test' });
  const midTerm = await Examination.countDocuments({ examCategory: 'Mid Term' });
  const finalTerm = await Examination.countDocuments({ examCategory: 'Final Term' });
  return { total, monthly, midTerm, finalTerm };
}

module.exports = { createExamination, listExaminations, getTotals };