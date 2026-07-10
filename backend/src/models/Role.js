const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Permission Model
 * Atomic, granular capabilities. Format convention: "<module>:<action>"
 * e.g. "student:create", "attendance:mark", "timetable:view"
 * Seeded once at system setup; rarely modified at runtime.
 */
const permissionSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true }, // "student:create"
    module: { type: String, required: true, trim: true }, // "student"
    action: { type: String, required: true, trim: true }, // "create"
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

permissionSchema.index({ key: 1 }, { unique: true });
permissionSchema.index({ module: 1 });

const Permission = mongoose.model('Permission', permissionSchema);

/**
 * Role Model
 * A named bundle of permissions. System roles (super_admin, admin, teacher)
 * are seeded and protected from deletion. Admins can additionally create
 * CUSTOM roles scoped to their own school (e.g. "Exam Coordinator").
 */
const roleSchema = new Schema(
  {
    name: { type: String, required: true, trim: true }, // "Teacher", "Exam Coordinator"
    slug: { type: String, required: true, trim: true, lowercase: true }, // "teacher", "exam_coordinator"

    // System roles exist platform-wide (schoolId = null). Custom roles are
    // scoped to the school that created them.
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', default: null },
    isSystemRole: { type: Boolean, default: false }, // true for super_admin/admin/teacher
    isDefault: { type: Boolean, default: false },

    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],

    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// A slug must be unique within a school (null schoolId = global system roles)
roleSchema.index({ slug: 1, schoolId: 1 }, { unique: true });

const Role = mongoose.model('Role', roleSchema);

module.exports = { Permission, Role };
