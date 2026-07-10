const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Timetable Model
 * One document per Section per academic term, holding the full weekly grid
 * as an embedded array. This is the right place to embed (rather than
 * normalize into one-doc-per-period) because:
 * - The grid is bounded in size (days x periods, never unbounded growth)
 * - It's always read/written as a whole ("show me 5-A's timetable")
 * - It rarely needs to be queried "across" periods independently
 */
const timetableSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },

    academicYear: { type: String, required: true },
    effectiveFrom: { type: Date, required: true },

    // Weekly grid: each entry is one period slot
    periods: [
      {
        dayOfWeek: {
          type: String,
          enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
          required: true,
        },
        periodNumber: { type: Number, required: true },
        startTime: { type: String, required: true }, // "09:00"
        endTime: { type: String, required: true }, // "09:45"
        subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
        teacherId: { type: Schema.Types.ObjectId, ref: 'TeacherProfile', required: true },
        roomNumber: String,
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

timetableSchema.index({ schoolId: 1, sectionId: 1, academicYear: 1 }, { unique: true });
// Supports "what is this teacher's schedule" lookups (queries inside the array)
timetableSchema.index({ 'periods.teacherId': 1 });

module.exports = mongoose.model('Timetable', timetableSchema);
