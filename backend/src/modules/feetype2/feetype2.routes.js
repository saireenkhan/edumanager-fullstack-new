const express = require("express");
const router = express.Router();

const feeType2Controller = require("./feetype2.controller");

router.post("/", feeType2Controller.createFeeType2);
router.get("/", feeType2Controller.getAllFeeTypes2);

module.exports = router;