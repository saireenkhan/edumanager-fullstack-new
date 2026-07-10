const FeeType = require('../../models/FeeType');
const ApiError = require('../../utils/ApiError');

async function createFeeType(data) {
  return FeeType.create({
    feeName: data.feeName,
    shortCode: data.shortCode,
    frequency: data.frequency,
    ledgerAccount: data.ledgerAccount,
    baseAmount: Number(data.baseAmount),
    mandatoryForAll: data.mandatoryForAll === true || data.mandatoryForAll === 'true',
    lateFeeFineLogic: data.lateFeeFineLogic || '',
  });
}

async function listFeeTypes() {
  return FeeType.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await FeeType.countDocuments();
  const monthly = await FeeType.countDocuments({ frequency: 'Monthly' });
  const oneTime = await FeeType.countDocuments({ frequency: 'One-Time' });
  const mandatory = await FeeType.countDocuments({ mandatoryForAll: true });
  return { total, monthly, oneTime, mandatory };
}

async function deleteFeeType(id) {
  const fee = await FeeType.findByIdAndDelete(id);
  if (!fee) throw new ApiError(404, 'Fee type not found');
  return fee;
}

module.exports = { createFeeType, listFeeTypes, getTotals, deleteFeeType };