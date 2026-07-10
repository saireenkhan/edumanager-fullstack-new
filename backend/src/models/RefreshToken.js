const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * RefreshToken Model
 * Supports the short-lived-access-token + long-lived-refresh-token pattern.
 * Storing refresh tokens (hashed) lets you revoke sessions (logout-all,
 * suspend account) instead of waiting for natural JWT expiry.
 */
const refreshTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tokenHash: { type: String, required: true }, // SHA-256 hash of the raw token, never store raw
    userAgent: String,
    ipAddress: String,
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
    replacedByTokenHash: { type: String, default: null }, // rotation chain tracking
  },
  { timestamps: true }
);

refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ tokenHash: 1 }, { unique: true });
// TTL index: MongoDB auto-deletes expired token docs, keeping the collection lean
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
