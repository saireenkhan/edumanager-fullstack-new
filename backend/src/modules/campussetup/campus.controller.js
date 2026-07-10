const asyncHandler = require('../../utils/asyncHandler');
const campusService = require('./campus.service');

const createCampus = asyncHandler(async (req, res) => {
  const campus = await campusService.createCampus(req.body);
  res.status(201).json({ success: true, data: campus });
});

const listCampuses = asyncHandler(async (req, res) => {
  const campuses = await campusService.listCampuses();
  res.json({ success: true, data: campuses });
});

const getCampus = asyncHandler(async (req, res) => {
  const campus = await campusService.getCampusById(req.params.id);
  res.json({ success: true, data: campus });
});

const updateCampus = asyncHandler(async (req, res) => {
  const campus = await campusService.updateCampus(req.params.id, req.body);
  res.json({ success: true, data: campus });
});

const deleteCampus = asyncHandler(async (req, res) => {
  await campusService.deleteCampus(req.params.id);
  res.json({ success: true, message: 'Campus deleted' });
});

module.exports = { createCampus, listCampuses, getCampus, updateCampus, deleteCampus };