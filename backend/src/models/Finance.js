const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * FeeType Model
 * Defines categories of fees a school charges (Tuition, Transport, Exam Fee).
 * Kept separate from actual fee transactions/invoices (not yet in scope —
 * add a FeeInvoice/FeePayment collection later referencing this + Student).
 */
const feeTypeSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    name: { type: String, required: true, trim: true }, // "Tuition Fee"
    amount: { type: Number, required: true },
    frequency: {
      type: String,
      enum: ['one_time', 'monthly', 'quarterly', 'annual'],
      default: 'monthly',
    },
    applicableClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    chartAccountId: { type: Schema.Types.ObjectId, ref: 'ChartOfAccount', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

feeTypeSchema.index({ schoolId: 1 });

const FeeType = mongoose.model('FeeType', feeTypeSchema);

/**
 * ChartOfAccount Model
 * Standard accounting ledger categories (Assets, Liabilities, Income,
 * Expense) used to classify fees, salaries, and other transactions.
 */
const chartOfAccountSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    name: { type: String, required: true, trim: true }, // "Tuition Income"
    code: { type: String, trim: true }, // "4001"
    type: {
      type: String,
      enum: ['asset', 'liability', 'equity', 'income', 'expense'],
      required: true,
    },
    parentAccount: { type: Schema.Types.ObjectId, ref: 'ChartOfAccount', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

chartOfAccountSchema.index({ schoolId: 1, code: 1 }, { unique: true, sparse: true });

const ChartOfAccount = mongoose.model('ChartOfAccount', chartOfAccountSchema);

module.exports = { FeeType, ChartOfAccount };
