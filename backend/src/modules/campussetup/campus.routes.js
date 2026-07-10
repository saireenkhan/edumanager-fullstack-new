const express = require('express');
const router = express.Router();
const controller = require('./campus.controller');

// Create a new campus
router.post('/', controller.createCampus);

// List all campuses
router.get('/', controller.listCampuses);

// Get a specific campus by ID
router.get('/:id', controller.getCampus);

// Update a specific campus
router.put('/:id', controller.updateCampus);

// Delete a specific campus
router.delete('/:id', controller.deleteCampus);

module.exports = router;