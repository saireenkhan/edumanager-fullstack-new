const Departs2 = require('../../models/Departs2');
const ApiError = require('../../utils/ApiError');

async function createDepart(data) {
  const exists = await Departs2.findOne({ Lead: data.Lead, DepartmentName: data.DepartmentName });
  if (exists) throw new ApiError(409, 'Department with this lead already exists');

  return Departs2.create(data);
}

async function listDeparts() {
  return Departs2.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await Departs2.countDocuments();
  const academic = await Departs2.countDocuments({ DepartmentName: 'Academic' });
  const administrative = await Departs2.countDocuments({ DepartmentName: 'Administrative' });
  const none = await Departs2.countDocuments({ DepartmentName: 'None (Main Unit)' });
  return { total, academic, administrative, none };
}

module.exports = { createDepart, listDeparts, getTotals };