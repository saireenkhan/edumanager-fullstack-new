const FeeType2 = require("../../models/FeeType2");

const formatFeeType2Row = (item) => {
  return {
    id: item._id,

    feeName: item.feeName,
    name: item.feeName,

    shortCode: item.shortCode,
    code: item.shortCode,

    frequency: item.frequency,
    ledgerAccount: item.ledgerAccount,

    baseAmount: item.baseAmount,
    amount: item.baseAmount,

    mandatoryForAll: item.mandatoryForAll,
    lateFeeFineLogic: item.lateFeeFineLogic,

    status: item.status,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

const createFeeType2 = async (data) => {
  const {
    feeName,
    shortCode,
    frequency,
    ledgerAccount,
    baseAmount,
    mandatoryForAll,
    lateFeeFineLogic,
  } = data;

  if (!feeName || !shortCode || !frequency || !ledgerAccount) {
    throw new Error("Fee name, short code, frequency and ledger account are required");
  }

  const normalizedFeeName = feeName.trim().toLowerCase();
  const normalizedShortCode = shortCode.trim().toLowerCase();

  const existingFeeType = await FeeType2.findOne({
    $or: [
      { normalizedFeeName },
      { normalizedShortCode },
    ],
  });

  if (existingFeeType) {
    if (existingFeeType.normalizedFeeName === normalizedFeeName) {
      throw new Error("This fee name already exists");
    }

    if (existingFeeType.normalizedShortCode === normalizedShortCode) {
      throw new Error("This short code already exists");
    }

    throw new Error("This fee type already exists");
  }

  const feeType = await FeeType2.create({
    feeName: feeName.trim(),
    normalizedFeeName,
    shortCode: shortCode.trim(),
    normalizedShortCode,
    frequency,
    ledgerAccount,
    baseAmount: Number(baseAmount) || 0,
    mandatoryForAll: mandatoryForAll || "No",
    lateFeeFineLogic: lateFeeFineLogic || "",
  });

  return formatFeeType2Row(feeType);
};

const getAllFeeTypes2 = async () => {
  const feeTypes = await FeeType2.find().sort({ createdAt: -1 });

  const rows = feeTypes.map(formatFeeType2Row);

  const totalFeeTypes = rows.length;

  const totalBaseAmount = rows.reduce(
    (sum, item) => sum + Number(item.baseAmount || 0),
    0
  );

  return {
    rows,
    totals: {
      totalFeeTypes,
      totalBaseAmount,
    },
  };
};

module.exports = {
  createFeeType2,
  getAllFeeTypes2,
};