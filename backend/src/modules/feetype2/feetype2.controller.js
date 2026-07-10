const feeType2Service = require("./feetype2.services");

const createFeeType2 = async (req, res) => {
  try {
    const feeType = await feeType2Service.createFeeType2(req.body);

    return res.status(201).json({
      success: true,
      message: "Fee type added successfully",
      data: feeType,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to add fee type",
    });
  }
};

const getAllFeeTypes2 = async (req, res) => {
  try {
    const result = await feeType2Service.getAllFeeTypes2();

    return res.status(200).json({
      success: true,
      message: "Fee types fetched successfully",
      data: result.rows,
      totals: result.totals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch fee types",
    });
  }
};

module.exports = {
  createFeeType2,
  getAllFeeTypes2,
};