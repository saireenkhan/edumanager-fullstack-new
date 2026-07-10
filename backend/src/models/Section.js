const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Section Model
 * A specific division within a Class, e.g. "5-A". This is the unit that
 * actually has a class-teacher, a roster of students, and a timetable.
 */
const sectionSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },

    name: { type: String, required: true, trim: true }, // "A", "B"
    classTeacher: { type: Schema.Types.ObjectId, ref: 'TeacherProfile', default: null },

    roomNumber: String,
    capacity: { type: Number, default: 40 },

    // Denormalized for fast roster-size dashboard queries; kept in sync
    // by Student create/transfer/delete hooks.
    currentStrength: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

sectionSchema.index({ schoolId: 1, classId: 1 });
sectionSchema.index({ classId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Section', sectionSchema);
