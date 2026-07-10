const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Attendance Model
 * One document PER STUDENT PER DAY (not one giant doc per section per day).
 * This looks less "efficient" than a nested array but scales far better:
 * - Avoids unbounded array growth inside a Section/Class document
 * - Lets you query "this student's attendance history" directly
 * - Lets you query "this section's attendance for this date" via index
 * - Avoids the 16MB document size ceiling on any high-traffic collection
 *
 * This is the highest-write-volume collection in the system (rows = 
 * students x school_days), so indexing here matters more than anywhere else.
 */
const attendanceSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },

    date: { type: Date, required: true }, // normalized to midnight UTC for the school's day

    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'half_day', 'excused'],
      required: true,
    },

    remarks: String,
    markedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // teacher who marked it

    // Optional: per-subject/period attendance instead of a single daily mark
    period: { type: Schema.Types.ObjectId, ref: 'Subject', default: null },
  },
  { timestamps: true }
);

// One attendance record per student per day per period (period null = whole-day mode)
attendanceSchema.index(
  { studentId: 1, date: 1, period: 1 },
  { unique: true }
);
// Fast "mark/view register for this section on this date" queries
attendanceSchema.index({ schoolId: 1, sectionId: 1, date: 1 });
// Fast "this student's attendance over a date range" queries
attendanceSchema.index({ studentId: 1, date: -1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
