const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * TeacherProfile Model
 * Domain/HR data about a teacher, kept separate from the User (auth) document.
 * Linked 1:1 with User via userId. This separation means you can extend
 * teacher-specific fields freely without bloating the auth-critical User collection.
 */
const teacherProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },

    employeeId: { type: String, trim: true }, // school-issued staff ID
    designation: { type: String, trim: true }, // "Senior Teacher", "HOD"
    qualifications: [String],
    joiningDate: Date,

    // Subjects this teacher is qualified/assigned to teach across the school
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],

    // Class-sections where this teacher is the homeroom/class teacher
    classTeacherOf: [{ type: Schema.Types.ObjectId, ref: 'Section' }],

    gender: { type: String, enum: ['male', 'female', 'other'] },
    dateOfBirth: Date,
    address: String,
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },

    documents: [
      {
        title: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

teacherProfileSchema.index({ userId: 1 }, { unique: true });
teacherProfileSchema.index({ schoolId: 1 });
teacherProfileSchema.index({ schoolId: 1, employeeId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('TeacherProfile', teacherProfileSchema);
