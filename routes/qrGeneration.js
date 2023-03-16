const express = require("express");
const { generateQRLink } = require("../controllers/qrGeneration");

const router = express.Router();

router.route("/url").get(generateQRLink);

module.exports = router;
