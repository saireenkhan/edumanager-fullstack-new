const ClassesSection2 = require('../../models/ClassesSection2');
const ApiError = require('../../utils/ApiError');

async function createRegistration(data) {
  const exists = await ClassesSection2.findOne({ studentName: data.studentName });
  if (exists) throw new ApiError(409, 'Student name already exists');

  return ClassesSection2.create(data);
}

async function listRegistrations() {
  return ClassesSection2.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await ClassesSection2.countDocuments();
  const morning = await ClassesSection2.countDocuments({ admissionShift: 'Morning Shift' });
  const evening = await ClassesSection2.countDocuments({ admissionShift: 'Evening Shift' });
  return { total, morning, evening };
}

module.exports = { createRegistration, listRegistrations, getTotals };