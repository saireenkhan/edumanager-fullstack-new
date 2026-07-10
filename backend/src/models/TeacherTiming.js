const mongoose = require("mongoose");

const teacherTimingSchema = new mongoose.Schema(
  {
    shiftTitle: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedShiftTitle: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    checkInTime: {
      type: String,
      required: true,
    },

    checkOutTime: {
      type: String,
      required: true,
    },

    gracePeriod: {
      type: Number,
      default: 0,
    },

    halfDayAfter: {
      type: String,
      required: false,
      default: "",
    },

    applicableDays: {
      type: [String],
      default: [],
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

teacherTimingSchema.pre("validate", function (next) {
  if (this.shiftTitle) {
    this.normalizedShiftTitle = this.shiftTitle.trim().toLowerCase();
  }

  next();
});

module.exports = mongoose.model("TeacherTiming", teacherTimingSchema);