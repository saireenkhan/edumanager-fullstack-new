const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema(
  {
    UserID: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    Password: {
      type: String,
      required: true,
      trim: true
    },

    roleType: {
      type: String,
      required: true,
      enum: ['Admin', 'Teacher']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Roles', rolesSchema);