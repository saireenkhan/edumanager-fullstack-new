const ClassSection = require('../../models/ClassSection');
const ApiError = require('../../utils/ApiError');

async function createRegistration(data) {
  return ClassSection.create({
    studentName: data.studentName,
    targetGrade: data.targetGrade,
    admissionShift: data.admissionShift,
    guardianContact: data.guardianContact,
    submittedDocs: data.submittedDocs || '',
  });
}

async function listRegistrations() {
  return ClassSection.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await ClassSection.countDocuments();
  const morning = await ClassSection.countDocuments({ admissionShift: 'Morning Shift' });
  const evening = await ClassSection.countDocuments({ admissionShift: 'Evening Shift' });
  return { totalApplicants: total, morningShift: morning, eveningShift: evening };
}

async function deleteRegistration(id) {
  const reg = await ClassSection.findByIdAndDelete(id);
  if (!reg) throw new ApiError(404, 'Registration not found');
  return reg;
}

module.exports = { createRegistration, listRegistrations, getTotals, deleteRegistration };