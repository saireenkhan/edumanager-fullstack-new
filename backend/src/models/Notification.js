const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Notification Model
 * One document per notification event, with a recipients array of
 * {userId, readAt} pairs. For very large broadcast lists (e.g. "all
 * 2,000 users in a school"), consider a fan-out worker that writes
 * per-user notification docs instead — but for typical school-scale
 * audiences (tens to low hundreds of recipients) this embedded design
 * keeps writes atomic and reads simple.
 */
const notificationSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },

    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['announcement', 'assignment', 'attendance', 'timetable', 'system', 'general'],
      default: 'general',
    },

    // Optional deep-link context, e.g. point straight at the assignment
    relatedEntity: {
      entityType: { type: String, enum: ['Assignment', 'Attendance', 'Timetable', null], default: null },
      entityId: { type: Schema.Types.ObjectId, default: null },
    },

    sentBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Target audience — at least one of these is set
    targetRoles: [{ type: String, enum: ['super_admin', 'admin', 'teacher'] }],
    targetSections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],

    recipients: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        readAt: { type: Date, default: null },
      },
    ],
  },
  { timestamps: true }
);

notificationSchema.index({ schoolId: 1, createdAt: -1 });
notificationSchema.index({ 'recipients.userId': 1, 'recipients.readAt': 1 });

module.exports = mongoose.model('Notification', notificationSchema);
