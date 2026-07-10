const express = require('express');
const router = express.Router();

const authenticate = require('../../middlewares/authenticate');
const scopeToSchool = require('../../middlewares/scopeToSchool');
const requirePermission = require('../../middlewares/requirePermission');
const controller = require('./students.controller');

// Every route here runs: verify token -> figure out school -> check permission -> controller
router.post('/', authenticate, scopeToSchool, requirePermission('student:create'), controller.createStudent);
router.get('/', authenticate, scopeToSchool, requirePermission('student:read'), controller.listStudents);
router.get('/:id', authenticate, scopeToSchool, requirePermission('student:read'), controller.getStudent);

module.exports = router;
