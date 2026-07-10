const Academic = require('../../models/Academic');
const ApiError = require('../../utils/ApiError');

async function createClass(data) {
  const sections = data.sections
    ? data.sections.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return Academic.create({
    className: data.className,
    capacity: data.capacity,
    department: data.department,
    sections,
  });
}

async function listClasses() {
  return Academic.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const classes = await Academic.find();
  const totalClasses = classes.length;
  const totalSections = classes.reduce((sum, c) => sum + c.sections.length, 0);
  const totalCapacity = classes.reduce((sum, c) => sum + Number(c.capacity), 0);
  return { totalClasses, totalSections, totalCapacity };
}

async function getClassById(id) {
  const cls = await Academic.findById(id);
  if (!cls) throw new ApiError(404, 'Class not found');
  return cls;
}

async function updateClass(id, data) {
  const sections = data.sections
    ? data.sections.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const cls = await Academic.findByIdAndUpdate(
    id,
    { className: data.className, capacity: data.capacity, department: data.department, sections },
    { new: true }
  );
  if (!cls) throw new ApiError(404, 'Class not found');
  return cls;
}

async function deleteClass(id) {
  const cls = await Academic.findByIdAndDelete(id);
  if (!cls) throw new ApiError(404, 'Class not found');
  return cls;
}

module.exports = { createClass, listClasses, getTotals, getClassById, updateClass, deleteClass };