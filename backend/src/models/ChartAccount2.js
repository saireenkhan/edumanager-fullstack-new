const mongoose = require("mongoose");

const chartAccount2Schema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedAccountName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    accountCode: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedAccountCode: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    primaryCategory: {
      type: String,
      required: true,
      enum: ["Assets", "Liabilities", "Revenue", "Expenses", "Equity"],
    },

    balanceType: {
      type: String,
      required: true,
      enum: ["Debit", "Credit"],
    },

    openingBalance: {
      type: Number,
      default: 0,
    },

    accountDescription: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

chartAccount2Schema.pre("validate", function (next) {
  if (this.accountName) {
    this.normalizedAccountName = this.accountName.trim().toLowerCase();
  }

  if (this.accountCode) {
    this.normalizedAccountCode = this.accountCode.trim().toLowerCase();
  }

  next();
});

module.exports = mongoose.model("ChartAccount2", chartAccount2Schema);