const SubjectAssignment = require('../../models/SubjectAssignment');
const ApiError = require('../../utils/ApiError');

async function createAssignment(data) {
  const exists = await SubjectAssignment.findOne({ classCode: data.classCode });
  if (exists) throw new ApiError(409, 'Subject code already exists');

  return SubjectAssignment.create(data);
}

async function listAssignments() {
  return SubjectAssignment.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await SubjectAssignment.countDocuments();
  return { total };
}

module.exports = { createAssignment, listAssignments, getTotals };