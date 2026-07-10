const salaryService = require("../salary/salary.service");

const createSalary = async (req, res) => {
  try {
    const salary = await salaryService.createSalary(req.body);

    return res.status(201).json({
      success: true,
      message: "Salary component added successfully",
      data: salary,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to add salary component",
    });
  }
};

const getAllSalaries = async (req, res) => {
  try {
    const result = await salaryService.getAllSalaries();

    return res.status(200).json({
      success: true,
      message: "Salary components fetched successfully",
      data: result.rows,
      totals: result.totals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch salary components",
    });
  }
};

module.exports = {
  createSalary,
  getAllSalaries,
};