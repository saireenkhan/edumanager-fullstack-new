const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * School (Tenant) Model
 * Root entity for multi-campus/multi-school support.
 * Every Admin manages exactly one School. Every downstream collection
 * (users, students, classes, etc.) carries a schoolId for data isolation.
 */
const schoolSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // e.g. "EDU-LHR-01"
    address: {
      line1: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    contactEmail: { type: String, lowercase: true, trim: true },
    contactPhone: String,
    logoUrl: String,

    // Subscription / plan gating — useful once Super Admin manages billing tiers
    plan: {
      type: String,
      enum: ['trial', 'basic', 'standard', 'premium'],
      default: 'trial',
    },
    isActive: { type: Boolean, default: true }, // Super Admin can suspend a school

    // Denormalized counters for fast dashboard reads (kept in sync via hooks/jobs)
    stats: {
      totalStudents: { type: Number, default: 0 },
      totalTeachers: { type: Number, default: 0 },
      totalClasses: { type: Number, default: 0 },
    },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Super Admin who onboarded it
  },
  { timestamps: true }
);

schoolSchema.index({ code: 1 }, { unique: true });
schoolSchema.index({ isActive: 1 });

module.exports = mongoose.model('School', schoolSchema);
