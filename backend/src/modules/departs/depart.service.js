const Depart = require('../../models/Depart');
const ApiError = require('../../utils/ApiError');

async function createDepart(data) {
  const exists = await Depart.findOne({ Lead: data.Lead, DepartmentName: data.DepartmentName });
  if (exists) throw new ApiError(409, 'Department with this lead already exists');

  return Depart.create(data);
}

async function listDeparts() {
  return Depart.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await Depart.countDocuments();
  const academic = await Depart.countDocuments({ DepartmentName: 'Academic' });
  const administrative = await Depart.countDocuments({ DepartmentName: 'Administrative' });
  const none = await Depart.countDocuments({ DepartmentName: 'None (Main Unit)' });
  return { total, academic, administrative, none };
}

module.exports = { createDepart, listDeparts, getTotals };