const asyncHandler = require('../../utils/asyncHandler');
const feeTypeService = require('./feetype.service');

const createFeeType = asyncHandler(async (req, res) => {
  const fee = await feeTypeService.createFeeType(req.body);
  res.status(201).json({ success: true, data: fee });
});

const listFeeTypes = asyncHandler(async (req, res) => {
  const fees = await feeTypeService.listFeeTypes();
  res.json({ success: true, data: fees });
});

const getTotals = asyncHandler(async (req, res) => {
  const totals = await feeTypeService.getTotals();
  res.json({ success: true, data: totals });
});

const deleteFeeType = asyncHandler(async (req, res) => {
  await feeTypeService.deleteFeeType(req.params.id);
  res.json({ success: true, message: 'Fee type deleted' });
});

module.exports = { createFeeType, listFeeTypes, getTotals, deleteFeeType };