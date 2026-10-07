const loginLogsService = require('./loginlogs.service');

async function getLoginLogs(req, res) {
  try {
    const logs =
      await loginLogsService.getAllLoginLogs();

    return res.status(200).json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error(
      'Get login logs error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        'Something went wrong while fetching login logs'
    });
  }
}

async function getLoginLogStats(req, res) {
  try {
    const stats =
      await loginLogsService.getLoginLogStats();

    return res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error(
      'Get login stats error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        'Something went wrong while fetching login log stats'
    });
  }
}

module.exports = {
  getLoginLogs,
  getLoginLogStats
};