const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Student Model
 * Students are NOT in the User collection — they don't authenticate into
 * these three panels (Super Admin/Admin/Teacher). If you later add a
 * Student/Parent portal, give them their own lightweight auth document
 * (e.g. StudentAccount) that references this Student profile, the same
 * pattern used for User <-> TeacherProfile. Keeps auth concerns isolated.
 */
const studentSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },

    admissionNumber: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    photoUrl: String,

    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    rollNumber: { type: String, trim: true },

    guardians: [
      {
        name: String,
        relation: { type: String, enum: ['father', 'mother', 'guardian'] },
        phone: String,
        email: String,
        isPrimaryContact: { type: Boolean, default: false },
      },
    ],

    address: String,
    bloodGroup: String,

    admissionDate: Date,
    status: {
      type: String,
      enum: ['active', 'inactive', 'graduated', 'transferred', 'expelled'],
      default: 'active',
    },

    // History of class/section moves over the years — useful for academic records
    academicHistory: [
      {
        academicYear: String,
        classId: { type: Schema.Types.ObjectId, ref: 'Class' },
        sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
      },
    ],
  },
  { timestamps: true }
);

studentSchema.index({ schoolId: 1, classId: 1, sectionId: 1 });
studentSchema.index({ schoolId: 1, admissionNumber: 1 }, { unique: true });
studentSchema.index({ schoolId: 1, status: 1 });
// Supports name search/autocomplete in admin & teacher panels
studentSchema.index({ schoolId: 1, firstName: 1, lastName: 1 });

module.exports = mongoose.model('Student', studentSchema);
