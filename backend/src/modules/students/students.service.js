const Student = require('../../models/Student');
const Section = require('../../models/Section');
const ApiError = require('../../utils/ApiError');

// THIS is where your actual business logic + database calls live.
async function createStudent(data, schoolId) {
  // example business rule: admission number must be unique per school
  const exists = await Student.findOne({ schoolId, admissionNumber: data.admissionNumber });
  if (exists) throw new ApiError(409, 'Admission number already exists for this school');

  const student = await Student.create({ ...data, schoolId });

  // example side-effect: keep Section.currentStrength in sync
  await Section.updateOne({ _id: data.sectionId }, { $inc: { currentStrength: 1 } });

  return student;
}

async function listStudents(schoolId, filters = {}) {
  const query = { schoolId };
  if (filters.classId) query.classId = filters.classId;
  if (filters.sectionId) query.sectionId = filters.sectionId;

  return Student.find(query).sort({ firstName: 1 });
}

async function getStudentById(id, schoolId) {
  const student = await Student.findOne({ _id: id, schoolId });
  if (!student) throw new ApiError(404, 'Student not found');
  return student;
}

module.exports = { createStudent, listStudents, getStudentById };
