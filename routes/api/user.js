const express = require("express");
const router = express.Router();
const { check, validataionResilt } = require("express-validator");

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("user router");
});
module.exports = router;

//https://youtu.be/Z09xbCo2eU4?list=PLRtgL54fRxE1ngSuElZIzsuX8Lntihgfo&t=74
