const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema(
  {
    UserID: {
      type: String,
      required: true,
      trim: true
    },

    roleType: {
      type: String,
      required: true,
      enum: ['Admin', 'Teacher']
    },

    status: {
      type: String,
      required: true,
      enum: ['Success', 'Failed']
    },

    reason: {
      type: String,
      default: ''
    },

    loginTime: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('LoginLog', loginLogSchema);
