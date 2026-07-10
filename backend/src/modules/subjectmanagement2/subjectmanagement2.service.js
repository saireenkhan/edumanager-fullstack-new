const SubjectManagement2 = require('../../models/SubjectManagement2');
const ApiError = require('../../utils/ApiError');

async function createSubject(data) {
  const exists = await SubjectManagement2.findOne({
    $or: [
      { subjectName: data.subjectName },
      { subjectCode: data.subjectCode }
    ]
  });
  if (exists) throw new ApiError(409, 'Subject name or code already exists');

  return SubjectManagement2.create(data);
}

async function listSubjects() {
  return SubjectManagement2.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await SubjectManagement2.countDocuments();
  const theory = await SubjectManagement2.countDocuments({ subjectCategory: 'Theory Only' });
  const practical = await SubjectManagement2.countDocuments({ subjectCategory: 'Practical Only' });
  const both = await SubjectManagement2.countDocuments({ subjectCategory: 'Both' });
  return { total, theory, practical, both };
}

module.exports = { createSubject, listSubjects, getTotals };