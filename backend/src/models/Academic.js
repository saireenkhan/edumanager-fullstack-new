const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema(
  {
    className: { type: String, required: true },
    capacity: { type: Number, required: true },
    department: { type: String, required: true },
    sections: [{ type: String }], // e.g. ["A", "B", "C"]
  },
  { timestamps: true }
);

const Academic = mongoose.model('Academic', academicSchema);
module.exports = Academic;