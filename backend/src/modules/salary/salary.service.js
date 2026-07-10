const Salary = require("../../models/Salary");

const toBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const cleanValue = value.trim().toLowerCase();

    if (cleanValue === "true" || cleanValue === "yes" || cleanValue === "1") {
      return true;
    }

    if (cleanValue === "false" || cleanValue === "no" || cleanValue === "0") {
      return false;
    }
  }

  return false;
};

const formatSalaryRow = (item) => {
  return {
    id: item._id,
    componentName: item.componentName,
    name: item.componentName,

    category: item.category,
    categoryType: item.category === "Earning (+)" ? "earning" : "deduction",

    calculationMethod: item.calculationMethod,
    calcType: item.calculationMethod,

    value: item.value,
    taxableComponent: item.taxableComponent,
    taxable: item.taxableComponent ? "Yes" : "No",

    mandatoryForAll: item.mandatoryForAll,
    status: item.status,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

const createSalary = async (data) => {
  const {
    componentName,
    category,
    calculationMethod,
    value,
    taxableComponent,
    mandatoryForAll,
  } = data;

  if (!componentName || !category || !calculationMethod) {
    throw new Error("Component name, category and calculation method are required");
  }

  const normalizedComponentName = componentName.trim().toLowerCase();

  const existingSalary = await Salary.findOne({
    normalizedComponentName,
  });

  if (existingSalary) {
    throw new Error("This salary component already exists");
  }

  const salary = await Salary.create({
    componentName: componentName.trim(),
    normalizedComponentName,
    category,
    calculationMethod,
    value: Number(value) || 0,
    taxableComponent: toBoolean(taxableComponent),
    mandatoryForAll: toBoolean(mandatoryForAll),
  });

  return formatSalaryRow(salary);
};

const getAllSalaries = async () => {
  const salaries = await Salary.find().sort({ createdAt: -1 });

  const rows = salaries.map(formatSalaryRow);

  const totalEarnings = rows
    .filter((item) => item.categoryType === "earning")
    .reduce((sum, item) => sum + Number(item.value || 0), 0);

  const totalDeductions = rows
    .filter((item) => item.categoryType === "deduction")
    .reduce((sum, item) => sum + Number(item.value || 0), 0);

  const netTotal = totalEarnings - totalDeductions;

  return {
    rows,
    totals: {
      totalEarnings,
      totalDeductions,
      netTotal,
    },
  };
};

module.exports = {
  createSalary,
  getAllSalaries,
};