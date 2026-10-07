const MarksEntry = require('../../models/MarksEntry');
const ApiError = require('../../utils/ApiError');

async function createMark(data) {
  const exists = await MarksEntry.findOne({
    rollNo: data.rollNo,
    subjectName: data.subjectName,
    assessmentType: data.assessmentType,
  });
  if (exists) throw new ApiError(409, 'Marks already entered for this student in this subject and assessment');

  return MarksEntry.create(data);
}

async function listMarks() {
  return MarksEntry.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await MarksEntry.countDocuments();
  const allMarks = await MarksEntry.find({}, { obtainedMarks: 1, totalMarks: 1 });
  const avgPercentage = total > 0
    ? Math.round(
        allMarks.reduce((sum, m) => sum + (m.obtainedMarks / m.totalMarks) * 100, 0) / total
      )
    : 0;
  return { total, avgPercentage };
}

module.exports = { createMark, listMarks, getTotals };