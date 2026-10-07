const mongoose = require('mongoose');

const salary2Schema = new mongoose.Schema(
  {
    componentName: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    calculationMethod: { type: String, required: true },
    value: { type: Number, default: 0 },
    taxableComponent: { type: String, default: '' },
    mandatoryForAll: { type: String, default: '' },
  },
  { timestamps: true }
);

const Salary2 = mongoose.model('Salary2', salary2Schema);
module.exports = Salary2;