const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * AuditLog Model
 * Append-only trail of sensitive actions (role changes, deletions, login
 * failures, permission changes). Not strictly "required" by the feature
 * list, but production RBAC systems need this for accountability —
 * "who changed this teacher's permissions, and when."
 */
const auditLogSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', default: null },
    actorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // "user:create", "role:update", "student:delete"
    targetType: String, // "User", "Student", "Role"
    targetId: Schema.Types.ObjectId,
    metadata: Schema.Types.Mixed, // before/after diff, IP, etc.
    ipAddress: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

auditLogSchema.index({ schoolId: 1, createdAt: -1 });
auditLogSchema.index({ actorId: 1, createdAt: -1 });
// TTL: auto-purge logs after 1 year (adjust to your compliance needs)
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
