// Injects req.scopedSchoolId for use in every downstream query's filter.
// super_admin has no fixed schoolId (can act platform-wide, or pass one
// explicitly via query/body for a specific school).
function scopeToSchool(req, res, next) {
  if (req.user.userType === 'super_admin') {
    req.scopedSchoolId = req.query.schoolId || req.body.schoolId || null;
  } else {
    req.scopedSchoolId = req.user.schoolId;
  }
  next();
}

module.exports = scopeToSchool;
