require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./modules/auth/auth.routes");
const campusRoutes = require("./modules/campussetup/campus.routes");
const academicRoutes = require("./modules/academic/academic.routes");
const studentRoutes = require("./modules/students/students.routes");
const classSectionRoutes = require("./modules/classsection/classsection.routes");
const subjectRoutes = require("./modules/subjectmanagment/subjectmanagement.routes");
const feeTypeRoutes = require("./modules/feetype/feetype.routes");
const chartAccountRoutes = require("./modules/chartaccount/chartaccount.routes");
const examinationRoutes = require("./modules/examinations/examination.routes");
const departRoutes = require("./modules/departs/depart.routes");
const salaryRoutes = require("./modules/salary/salary.routes");
const teacherTimingRoutes = require("./modules/teachertiming/teachertiming.routes");
const academic2Routes = require('./modules/academic2/academic2.routes');
const classSection2Routes = require('./modules/classsection2/classsection2.routes');
const subjectManagement2Routes = require('./modules/subjectmanagement2/subjectmanagement2.routes.js');
const feeType2Routes = require("./modules/feetype2/feetype2.routes.js");
const chartAccount2Routes = require("./modules/chartaccount2/chartaccount2.routes");
const examination2Routes = require('./modules/Examination2/examination2.routes.js');
const departs2Routes = require('./modules/departs2/depart2.routes.js');
const salary2Routes = require('./modules/salary2/salary2.routes.js');
const subjectAssignmentRoutes = require('./modules/subjectassignment/subjectassignment.routes.js');
const lessonPlanningRoutes = require('./modules/LessonPlanning/lessonplanning.routes.js');
const topicCoverageRoutes = require('./modules/topiccoverage/topiccoverage.routes.js');
const homeworkRoutes = require('./modules/homework/homework.routes.js');
const attendanceRoutes = require('./modules/attendance/attendence.routes.js');
const marksRoutes = require('./modules/marks/mark.routes.js');
const rolesRoutes = require('./modules/roles/roles.routes.js');
const resultGenerationRoutes = require('./modules/resultgeneration/resultgeneration.routes.js');
const loginLogsRoutes = require(
  './modules/loginlogs/loginlogs.routes.js'
);




const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EduManager backend is live",
  });
});
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/salary", salaryRoutes);
app.use('/api/login-logs', loginLogsRoutes);
app.use('/api/marks', marksRoutes);
app.use("/api/roles", rolesRoutes);
app.use('/api/resultgeneration', resultGenerationRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use('/api/topiccoverage', topicCoverageRoutes);
app.use('/api/lessonplanning', lessonPlanningRoutes);
app.use('/api/departs2', departs2Routes);
app.use('/api/subjectassignment', subjectAssignmentRoutes)
app.use('/api/salary2', salary2Routes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/examination2', examination2Routes);
app.use('/api/academic2', academic2Routes);
app.use("/api/campuses", campusRoutes);
app.use("/api/academic", academicRoutes);
app.use("/api/departs", departRoutes);
app.use("/api/chart-accounts-2", chartAccount2Routes);
app.use("/api/fee-types-2", feeType2Routes);
app.use('/api/classsection2', classSection2Routes);
app.use('/api/subjectmanagement2', subjectManagement2Routes);
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/feetype", feeTypeRoutes);
app.use("/api/teacher-timings", teacherTimingRoutes);
app.use("/api/chartaccount", chartAccountRoutes);
app.use("/api/examination", examinationRoutes);
app.use("/api/classsection", classSectionRoutes);

app.use(errorHandler); // must be registered last

module.exports = app;
