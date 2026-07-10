const mongoose = require('mongoose');

const academic2Schema = new mongoose.Schema(
  {
    className: { type: String, required: true, unique: true },
    capacity: { type: String, required: true },
    department: { type: String, required: true },
    sections: [{ type: String }],
  },
  { timestamps: true }
);

const Academic2 = mongoose.model('Academic2', academic2Schema);
module.exports = Academic2;