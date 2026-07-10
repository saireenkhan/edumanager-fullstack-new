const mongoose = require('mongoose');

const feeTypeSchema = new mongoose.Schema(
  {
    feeName: { type: String, required: true },
    shortCode: { type: String, required: true },
    frequency: { type: String, required: true },
    ledgerAccount: { type: String, required: true },
    baseAmount: { type: Number, required: true },
    mandatoryForAll: { type: String, default: '' },
    lateFeeFineLogic: { type: String, default: '' },
  },
  { timestamps: true }
);

const FeeType = mongoose.model('FeeType', feeTypeSchema);
module.exports = FeeType;