const ChartAccount = require('../../models/ChartAccount');
const ApiError = require('../../utils/ApiError');

async function createAccount(data) {
  const exists = await ChartAccount.findOne({ accountCode: data.accountCode });
  if (exists) throw new ApiError(409, 'Account code already exists');

  return ChartAccount.create(data);
}

async function listAccounts() {
  return ChartAccount.find().sort({ createdAt: -1 });
}

async function getTotals() {
  const total = await ChartAccount.countDocuments();
  const debit = await ChartAccount.countDocuments({ balanceType: 'Debit' });
  const credit = await ChartAccount.countDocuments({ balanceType: 'Credit' });
  const assets = await ChartAccount.countDocuments({ primaryCategory: 'Assets' });
  return { total, debit, credit, assets };
}

module.exports = { createAccount, listAccounts, getTotals };