const teacherTimingService = require("./teachertiming.service");

const createTeacherTiming = async (req, res) => {
  try {
    const teacherTiming = await teacherTimingService.createTeacherTiming(req.body);

    return res.status(201).json({
      success: true,
      message: "Teacher timing added successfully",
      data: teacherTiming,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to add teacher timing",
    });
  }
};

const getAllTeacherTimings = async (req, res) => {
  try {
    const result = await teacherTimingService.getAllTeacherTimings();

    return res.status(200).json({
      success: true,
      message: "Teacher timings fetched successfully",
      data: result.rows,
      totals: result.totals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch teacher timings",
    });
  }
};

module.exports = {
  createTeacherTiming,
  getAllTeacherTimings,
};