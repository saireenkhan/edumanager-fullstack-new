const mongoose = require('mongoose');

const chartAccountSchema = new mongoose.Schema(
  {
    accountName: { type: String, required: true },
    accountCode: { type: String, required: true, unique: true },
    primaryCategory: { type: String, required: true },
    balanceType: { type: String, required: true },
    openingBalance: { type: Number, default: 0 },
    accountDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

const ChartAccount = mongoose.model('ChartAccount', chartAccountSchema);
module.exports = ChartAccount;