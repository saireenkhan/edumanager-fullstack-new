const express = require('express');

const rolesController = require('./roles.controller');

const router = express.Router();

router.post('/', rolesController.createRole);

router.get('/', rolesController.getRoles);

router.get('/totals', rolesController.getRoleTotals);

module.exports = router;