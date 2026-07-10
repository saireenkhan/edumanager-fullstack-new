const TeacherTiming = require("../../models/TeacherTiming");

const formatApplicableDays = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((day) => day.trim())
      .filter(Boolean);
  }

  if (typeof value === "object" && value !== null) {
    return Object.keys(value).filter((key) => value[key]);
  }

  return [];
};

const formatTeacherTimingRow = (item) => {
  return {
    id: item._id,

    shiftTitle: item.shiftTitle,
    name: item.shiftTitle,

    checkInTime: item.checkInTime,
    inTime: item.checkInTime,

    checkOutTime: item.checkOutTime,
    outTime: item.checkOutTime,

    gracePeriod: item.gracePeriod,
    gracePeriodText: `${item.gracePeriod} mins`,

    halfDayAfter: item.halfDayAfter,

    applicableDays: item.applicableDays,
    days: item.applicableDays.join(", "),

    status: item.status,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

const createTeacherTiming = async (data) => {
  const {
    shiftTitle,
    checkInTime,
    checkOutTime,
    gracePeriod,
    halfDayAfter,
    applicableDays,
  } = data;

  if (!shiftTitle || !checkInTime || !checkOutTime) {
    throw new Error("Shift title, check-in time and check-out time are required");
  }

  const normalizedShiftTitle = shiftTitle.trim().toLowerCase();

  const existingShift = await TeacherTiming.findOne({
    normalizedShiftTitle,
  });

  if (existingShift) {
    throw new Error("This shift title already exists");
  }

  const teacherTiming = await TeacherTiming.create({
    shiftTitle: shiftTitle.trim(),
    normalizedShiftTitle,
    checkInTime,
    checkOutTime,
    gracePeriod: Number(gracePeriod) || 0,
    halfDayAfter: halfDayAfter || "",
    applicableDays: formatApplicableDays(applicableDays),
  });

  return formatTeacherTimingRow(teacherTiming);
};

const getAllTeacherTimings = async () => {
  const teacherTimings = await TeacherTiming.find().sort({ createdAt: -1 });

  const rows = teacherTimings.map(formatTeacherTimingRow);

  const totalGracePeriod = rows.reduce(
    (sum, item) => sum + Number(item.gracePeriod || 0),
    0
  );

  const totalShifts = rows.length;

  return {
    rows,
    totals: {
      totalShifts,
      totalGracePeriod,
    },
  };
};

module.exports = {
  createTeacherTiming,
  getAllTeacherTimings,
};