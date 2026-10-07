const Roles = require('../../models/Role');

async function createRole(data) {
  const UserID = String(data.UserID || '').trim();
  const Password = String(data.Password || '').trim();
  const roleType = String(data.roleType || '').trim();

  if (!UserID) {
    const error = new Error('User ID is required');
    error.statusCode = 400;
    throw error;
  }

  if (!Password) {
    const error = new Error('Password is required');
    error.statusCode = 400;
    throw error;
  }

  if (!['Admin', 'Teacher'].includes(roleType)) {
    const error = new Error('Invalid role type');
    error.statusCode = 400;
    throw error;
  }

  const existingRole = await Roles.findOne({
    UserID: {
      $regex: `^${escapeRegex(UserID)}$`,
      $options: 'i'
    }
  });

  if (existingRole) {
    const error = new Error('User ID already exists');
    error.statusCode = 409;
    throw error;
  }

  const role = await Roles.create({
    UserID,
    Password,
    roleType
  });

  return formatRoleRow(role);
}

async function listRoles() {
  const roles = await Roles.find().sort({ createdAt: -1 });

  return roles.map(formatRoleRow);
}

async function getRoleTotals() {
  const [totalAdmin, totalTeachers] = await Promise.all([
    Roles.countDocuments({ roleType: 'Admin' }),
    Roles.countDocuments({ roleType: 'Teacher' })
  ]);

  return {
    totalAdmin,
    totalTeachers,
    total: totalAdmin + totalTeachers
  };
}

function formatRoleRow(role) {
  return {
    id: role._id,
    UserID: role.UserID,
    Password: role.Password,
    roleType: role.roleType,
    createdAt: role.createdAt,
    updatedAt: role.updatedAt
  };
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  createRole,
  listRoles,
  getRoleTotals
};