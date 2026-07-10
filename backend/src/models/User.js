const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

/**
 * User Model
 * Single identity collection for everyone who LOGS IN: Super Admin, Admin, Teacher.
 * Students are intentionally NOT users here (see Student model) unless you later
 * decide students/parents need portal logins — at which point they'd get a
 * userType: 'student' | 'parent' added below and a linked profile the same way
 * Teacher does.
 */
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    avatarUrl: String,

    passwordHash: { type: String, required: true, select: false }, // never returned by default

    userType: {
      type: String,
      enum: ['super_admin', 'admin', 'teacher'],
      required: true,
    },

    // null for super_admin (platform-wide). Required for admin/teacher.
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', default: null },

    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },

    // Profile linkage — populated only for teachers. Keeps auth concerns
    // (User) separate from domain concerns (TeacherProfile: subjects, classes, etc.)
    profileRef: { type: Schema.Types.ObjectId, ref: 'TeacherProfile', default: null },

    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },

    lastLoginAt: Date,

    // --- Security hardening fields ---
    passwordChangedAt: Date,
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: Date,
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: Date, // account lockout after repeated failed attempts

    mustChangePassword: { type: Boolean, default: false }, // force reset on first login

    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

userSchema.index({ schoolId: 1, userType: 1 });
userSchema.index({ schoolId: 1, status: 1 });

// --- Hooks ---
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  this.passwordChangedAt = new Date();
  next();
});

// --- Instance methods ---
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

userSchema.methods.isLocked = function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

module.exports = mongoose.model('User', userSchema);
