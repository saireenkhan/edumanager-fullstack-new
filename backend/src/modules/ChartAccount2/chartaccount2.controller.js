const chartAccount2Service = require("./chartaccount2.service");

const createChartAccount2 = async (req, res) => {
  try {
    const account = await chartAccount2Service.createChartAccount2(req.body);

    return res.status(201).json({
      success: true,
      message: "Chart account added successfully",
      data: account,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to add chart account",
    });
  }
};

const getAllChartAccounts2 = async (req, res) => {
  try {
    const result = await chartAccount2Service.getAllChartAccounts2();

    return res.status(200).json({
      success: true,
      message: "Chart accounts fetched successfully",
      data: result.rows,
      totals: result.totals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch chart accounts",
    });
  }
};

module.exports = {
  createChartAccount2,
  getAllChartAccounts2,
};