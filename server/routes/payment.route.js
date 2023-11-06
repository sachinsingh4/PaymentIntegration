const express = require("express");
const payment = require("../controllers/payment.controller");
const router = express.Router();

router.post("/checkout", payment.checkout);
router.post("/paymentverification", payment.verification);
//This is constant export
module.exports = router;
