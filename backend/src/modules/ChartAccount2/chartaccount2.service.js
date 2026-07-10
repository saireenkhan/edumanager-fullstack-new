const ChartAccount2 = require("../../models/ChartAccount2");

const formatChartAccount2Row = (item) => {
  return {
    id: item._id,

    accountName: item.accountName,
    name: item.accountName,

    accountCode: item.accountCode,
    code: item.accountCode,

    primaryCategory: item.primaryCategory,
    category: item.primaryCategory,

    balanceType: item.balanceType,

    openingBalance: item.openingBalance,
    balance: item.openingBalance,

    accountDescription: item.accountDescription,
    description: item.accountDescription,

    status: item.status,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

const createChartAccount2 = async (data) => {
  const {
    accountName,
    accountCode,
    primaryCategory,
    balanceType,
    openingBalance,
    accountDescription,
  } = data;

  if (!accountName || !accountCode || !primaryCategory || !balanceType) {
    throw new Error("Account name, account code, primary category and balance type are required");
  }

  const normalizedAccountName = accountName.trim().toLowerCase();
  const normalizedAccountCode = accountCode.trim().toLowerCase();

  const existingAccount = await ChartAccount2.findOne({
    $or: [
      { normalizedAccountName },
      { normalizedAccountCode },
    ],
  });

  if (existingAccount) {
    if (existingAccount.normalizedAccountName === normalizedAccountName) {
      throw new Error("This account name already exists");
    }

    if (existingAccount.normalizedAccountCode === normalizedAccountCode) {
      throw new Error("This account code already exists");
    }

    throw new Error("This chart account already exists");
  }

  const account = await ChartAccount2.create({
    accountName: accountName.trim(),
    normalizedAccountName,

    accountCode: accountCode.trim(),
    normalizedAccountCode,

    primaryCategory,
    balanceType,

    openingBalance: Number(openingBalance) || 0,
    accountDescription: accountDescription || "",
  });

  return formatChartAccount2Row(account);
};

const getAllChartAccounts2 = async () => {
  const accounts = await ChartAccount2.find().sort({ createdAt: -1 });

  const rows = accounts.map(formatChartAccount2Row);

  const totalAccounts = rows.length;

  const totalOpeningBalance = rows.reduce(
    (sum, item) => sum + Number(item.openingBalance || 0),
    0
  );

  const totalDebitBalance = rows
    .filter((item) => item.balanceType === "Debit")
    .reduce((sum, item) => sum + Number(item.openingBalance || 0), 0);

  const totalCreditBalance = rows
    .filter((item) => item.balanceType === "Credit")
    .reduce((sum, item) => sum + Number(item.openingBalance || 0), 0);

  return {
    rows,
    totals: {
      totalAccounts,
      totalOpeningBalance,
      totalDebitBalance,
      totalCreditBalance,
    },
  };
};

module.exports = {
  createChartAccount2,
  getAllChartAccounts2,
};