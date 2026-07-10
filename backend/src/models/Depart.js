const mongoose = require('mongoose');

const departSchema = new mongoose.Schema(
  {
    Lead: { type: String, required: true },
    KeyDesignation: { type: String, required: true },
    DepartmentName: { type: String, required: true },
    StaffCount: { type: String, default: '' },
  },
  { timestamps: true }
);

const Depart = mongoose.model('Depart', departSchema);
module.exports = Depart;