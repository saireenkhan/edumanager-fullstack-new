const mongoose = require('mongoose');

const campusSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

const Campus = mongoose.model('Campus', campusSchema);
module.exports = Campus;