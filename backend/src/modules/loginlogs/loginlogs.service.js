const LoginLog = require('../../models/LoginLog');

async function getAllLoginLogs() {
  return LoginLog.find()
    .sort({ loginTime: -1 });
}

async function getLoginLogStats() {
  const startOfToday = new Date();

  startOfToday.setHours(
    0,
    0,
    0,
    0
  );

  const [
    totalEvents,
    loginsToday,
    successfulLogins,
    failedLogins
  ] = await Promise.all([
    LoginLog.countDocuments(),

    LoginLog.countDocuments({
      loginTime: {
        $gte: startOfToday
      }
    }),

    LoginLog.countDocuments({
      status: 'Success'
    }),

    LoginLog.countDocuments({
      status: 'Failed'
    })
  ]);

  return {
    totalEvents,
    loginsToday,
    successfulLogins,
    failedLogins
  };
}

module.exports = {
  getAllLoginLogs,
  getLoginLogStats
};