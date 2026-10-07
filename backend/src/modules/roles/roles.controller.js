const rolesService = require('./roles.service');

async function createRole(req, res) {
  try {
    const role = await rolesService.createRole(req.body);

    return res.status(201).json({
      success: true,
      message: `${role.roleType} created successfully`,
      data: role
    });
  } catch (error) {
    console.error('Create role error:', error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Something went wrong while saving role'
    });
  }
}

async function getRoles(req, res) {
  try {
    const roles = await rolesService.listRoles();

    return res.status(200).json({
      success: true,
      data: roles
    });
  } catch (error) {
    console.error('Get roles error:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong while fetching roles'
    });
  }
}

async function getRoleTotals(req, res) {
  try {
    const totals = await rolesService.getRoleTotals();

    return res.status(200).json({
      success: true,
      data: totals
    });
  } catch (error) {
    console.error('Get role totals error:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong while fetching role totals'
    });
  }
}

module.exports = {
  createRole,
  getRoles,
  getRoleTotals
};