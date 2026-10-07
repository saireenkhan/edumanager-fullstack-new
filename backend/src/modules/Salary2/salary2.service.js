const Salary2 = require('../../models/Salary2');
const ApiError = require('../../utils/ApiError');

async function createSalary(data) {
  const exists = await Salary2.findOne({ componentName: data.componentName });
  if (exists) throw new ApiError(409, 'Component name already exists');

  return Salary2.create(data);
}

async function listSalaries() {
  return Salary2.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await Salary2.countDocuments();
  const earnings = await Salary2.countDocuments({ category: 'Earning (+)' });
  const deductions = await Salary2.countDocuments({ category: 'Deduction (-)' });
  return { total, earnings, deductions };
}

module.exports = { createSalary, listSalaries, getTotals };