const express = require("express");
const router = express.Router();

const salaryController = require("../salary/salary.controller");

router.post("/", salaryController.createSalary);
router.get("/", salaryController.getAllSalaries);

module.exports = router;