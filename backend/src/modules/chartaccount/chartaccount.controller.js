const asyncHandler = require('../../utils/asyncHandler');
const chartAccountService = require('./chartaccount.service');

const createAccount = asyncHandler(async (req, res) => {
  const account = await chartAccountService.createAccount(req.body);
  res.status(201).json({ success: true, data: account });
});

const listAccounts = asyncHandler(async (req, res) => {
  const accounts = await chartAccountService.listAccounts();
  res.json({ success: true, data: accounts });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await chartAccountService.getTotals();
  res.json({ success: true, data: totals });
});

module.exports = { createAccount, listAccounts, getTotals };