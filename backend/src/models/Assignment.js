const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Assignment Model
 * One document per assignment/homework given by a teacher to a section/subject.
 * Submissions are a SEPARATE collection (AssignmentSubmission) rather than
 * an embedded array — with 40 students per section, embedding submissions
 * (which may include file URLs, text, grading, feedback) risks unbounded
 * document growth and makes "show me all my pending submissions" queries
 * across many assignments awkward.
 */
const assignmentSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },

    title: { type: String, required: true, trim: true },
    description: String,
    attachments: [
      {
        title: String,
        url: String,
      },
    ],

    assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // teacher
    assignedDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },

    maxMarks: { type: Number, default: null },

    status: {
      type: String,
      enum: ['draft', 'published', 'closed'],
      default: 'published',
    },
  },
  { timestamps: true }
);

assignmentSchema.index({ schoolId: 1, sectionId: 1, subjectId: 1 });
assignmentSchema.index({ assignedBy: 1, dueDate: -1 });
assignmentSchema.index({ sectionId: 1, dueDate: -1 });

const AssignmentModel = mongoose.model('Assignment', assignmentSchema);

/**
 * AssignmentSubmission Model
 * One document per student per assignment.
 */
const assignmentSubmissionSchema = new Schema(
  {
    assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },

    submittedAt: Date,
    attachments: [
      {
        title: String,
        url: String,
      },
    ],
    textAnswer: String,

    status: {
      type: String,
      enum: ['pending', 'submitted', 'late', 'graded'],
      default: 'pending',
    },

    marksObtained: { type: Number, default: null },
    feedback: String,
    gradedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    gradedAt: Date,
  },
  { timestamps: true }
);

assignmentSubmissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });
assignmentSubmissionSchema.index({ studentId: 1, status: 1 });

const AssignmentSubmissionModel = mongoose.model(
  'AssignmentSubmission',
  assignmentSubmissionSchema
);

module.exports = { Assignment: AssignmentModel, AssignmentSubmission: AssignmentSubmissionModel };
