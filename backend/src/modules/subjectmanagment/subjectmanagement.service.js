const Subject = require('../../models/SubjectManagement');
const ApiError = require('../../utils/ApiError');

async function createSubject(data) {
  return Subject.create({
    subjectName: data.subjectName,
    subjectCode: data.subjectCode,
    assignedClass: data.assignedClass,
    subjectCategory: data.subjectCategory,
    passingPercentage: Number(data.passingPercentage),
    totalMarks: Number(data.totalMarks),
    subjectObjectives: data.subjectObjectives || '',
  });
}

async function listSubjects() {
  return Subject.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await Subject.countDocuments();
  const theory = await Subject.countDocuments({ subjectCategory: 'Theory Only' });
  const practical = await Subject.countDocuments({ subjectCategory: 'Practical Only' });
  const both = await Subject.countDocuments({ subjectCategory: 'Both' });
  return { total, theory, practical, both };
}

async function deleteSubject(id) {
  const subject = await Subject.findByIdAndDelete(id);
  if (!subject) throw new ApiError(404, 'Subject not found');
  return subject;
}

module.exports = { createSubject, listSubjects, getTotals, deleteSubject };