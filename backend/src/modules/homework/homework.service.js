const Homework = require('../../models/Homework');
const ApiError = require('../../utils/ApiError');

async function createHomework(data) {
  const exists = await Homework.findOne({ title: data.title });
  if (exists) throw new ApiError(409, 'Homework title already exists');

  return Homework.create(data);
}

async function listHomework() {
  return Homework.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await Homework.countDocuments();
  return { total };
}

module.exports = { createHomework, listHomework, getTotals };