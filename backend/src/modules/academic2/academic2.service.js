const Academic2 = require('../../models/Academic2');
const ApiError = require('../../utils/ApiError');

async function createClass(data) {
  const exists = await Academic2.findOne({ className: data.className });
  if (exists) throw new ApiError(409, 'Class name already exists');

  const sections = data.sections
    ? data.sections.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return Academic2.create({
    className: data.className,
    capacity: data.capacity,
    department: data.department,
    sections,
  });
}

async function listClasses() {
  return Academic2.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const classes = await Academic2.find();
  const totalClasses = classes.length;
  const totalSections = classes.reduce((sum, c) => sum + c.sections.length, 0);
  const totalCapacity = classes.reduce((sum, c) => sum + Number(c.capacity), 0);
  const avgStrength = totalClasses > 0 ? Math.round(totalCapacity / totalClasses) : 0;
  return { totalClasses, totalSections, avgStrength };
}

module.exports = { createClass, listClasses, getTotals };