const express = require("express");
const router = express.Router();

const teacherTimingController = require("./teachertiming.controller");

router.post("/", teacherTimingController.createTeacherTiming);
router.get("/", teacherTimingController.getAllTeacherTimings);

module.exports = router;