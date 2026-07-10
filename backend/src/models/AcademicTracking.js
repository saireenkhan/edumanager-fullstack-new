const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * LessonPlan Model
 * A teacher's planned lesson for a subject/section, scheduled by date.
 */
const lessonPlanSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'TeacherProfile', required: true },

    title: { type: String, required: true, trim: true },
    description: String,
    plannedDate: { type: Date, required: true },
    objectives: [String],
    resources: [{ title: String, url: String }],

    status: {
      type: String,
      enum: ['planned', 'completed', 'rescheduled'],
      default: 'planned',
    },
  },
  { timestamps: true }
);

lessonPlanSchema.index({ sectionId: 1, subjectId: 1, plannedDate: 1 });
lessonPlanSchema.index({ teacherId: 1, plannedDate: -1 });

const LessonPlan = mongoose.model('LessonPlan', lessonPlanSchema);

/**
 * TopicCoverage Model
 * Tracks syllabus progress: which curriculum topics have been taught,
 * for which subject/section, and when. Distinct from LessonPlan because
 * one lesson can cover part of a topic, and a topic can span many lessons —
 * this is the "did we finish the syllabus" view, not the "what did we plan
 * to teach today" view.
 */
const topicCoverageSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'TeacherProfile', required: true },

    topicName: { type: String, required: true, trim: true },
    chapterName: String,

    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
    completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
    coveredOn: Date,
    remarks: String,

    relatedLessonPlans: [{ type: Schema.Types.ObjectId, ref: 'LessonPlan' }],
  },
  { timestamps: true }
);

topicCoverageSchema.index({ sectionId: 1, subjectId: 1 });
topicCoverageSchema.index({ schoolId: 1, subjectId: 1, status: 1 });

const TopicCoverage = mongoose.model('TopicCoverage', topicCoverageSchema);

module.exports = { LessonPlan, TopicCoverage };
