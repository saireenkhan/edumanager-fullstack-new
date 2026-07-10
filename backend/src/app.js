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
const academic2Routes = require("./modules/academic2/academic2.routes");
const classSection2Routes = require("./modules/classsection2/classsection2.routes");
const subjectManagement2Routes = require(
  "./modules/subjectmanagement2/subjectmanagement2.routes.js"
);
const feeType2Routes = require("./modules/feetype2/feetype2.routes.js");
const chartAccount2Routes = require(
  "./modules/chartaccount2/chartaccount2.routes"
);

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EduManager backend is live",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/academic2", academic2Routes);
app.use("/api/campuses", campusRoutes);
app.use("/api/academic", academicRoutes);
app.use("/api/departs", departRoutes);
app.use("/api/chart-accounts-2", chartAccount2Routes);
app.use("/api/fee-types-2", feeType2Routes);
app.use("/api/classsection2", classSection2Routes);
app.use("/api/subjectmanagement2", subjectManagement2Routes);
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/feetype", feeTypeRoutes);
app.use("/api/teacher-timings", teacherTimingRoutes);
app.use("/api/chartaccount", chartAccountRoutes);
app.use("/api/examination", examinationRoutes);
app.use("/api/classsection", classSectionRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use(errorHandler);

module.exports = app;