const express = require("express");
const router = express.Router();

const chartAccount2Controller = require("./chartaccount2.controller");

router.post("/", chartAccount2Controller.createChartAccount2);
router.get("/", chartAccount2Controller.getAllChartAccounts2);

module.exports = router;