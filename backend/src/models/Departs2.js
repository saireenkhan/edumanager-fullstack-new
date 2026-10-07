const mongoose = require('mongoose');

const departs2Schema = new mongoose.Schema(
  {
    Lead: { type: String, required: true },
    KeyDesignation: { type: String, required: true },
    DepartmentName: { type: String, required: true },
    StaffCount: { type: String, default: '' },
  },
  { timestamps: true }
);

const Departs2 = mongoose.model('Departs2', departs2Schema);
module.exports = Departs2;