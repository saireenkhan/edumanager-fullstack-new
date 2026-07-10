const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    componentName: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedComponentName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Earning (+)", "Deduction (-)"],
    },

    calculationMethod: {
      type: String,
      required: true,
      enum: [
        "Fixed Amount",
        "Percentage of Basic Pay",
        "Percentage of Gross Pay",
      ],
    },

    value: {
      type: Number,
      required: true,
      default: 0,
    },

    taxableComponent: {
      type: Boolean,
      default: false,
    },

    mandatoryForAll: {
      type: Boolean,
      default: false,
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

salarySchema.pre("validate", function (next) {
  if (this.componentName) {
    this.normalizedComponentName = this.componentName.trim().toLowerCase();
  }
  next();
});

module.exports = mongoose.model("Salary", salarySchema);