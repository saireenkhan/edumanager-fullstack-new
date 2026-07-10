const mongoose = require("mongoose");

const feeType2Schema = new mongoose.Schema(
  {
    feeName: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedFeeName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    shortCode: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedShortCode: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    frequency: {
      type: String,
      required: true,
      enum: ["Monthly", "Quarterly", "Bi-Annually", "Annually", "One-Time"],
    },

    ledgerAccount: {
      type: String,
      required: true,
      enum: ["Income - Tuition", "Income - Other"],
    },

    baseAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    mandatoryForAll: {
      type: String,
      default: "No",
      trim: true,
    },

    lateFeeFineLogic: {
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

feeType2Schema.pre("validate", function (next) {
  if (this.feeName) {
    this.normalizedFeeName = this.feeName.trim().toLowerCase();
  }

  if (this.shortCode) {
    this.normalizedShortCode = this.shortCode.trim().toLowerCase();
  }

  next();
});

module.exports = mongoose.model("FeeType2", feeType2Schema);