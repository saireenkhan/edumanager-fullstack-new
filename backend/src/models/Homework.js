const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    subjectName: { type: String, required: true },
    classSection: { type: String, required: true },
    issueDate: { type: String, required: true },
    dueDate: { type: String, required: true },
  },
  { timestamps: true }
);

const Homework = mongoose.model('Homework', homeworkSchema);
module.exports = Homework;