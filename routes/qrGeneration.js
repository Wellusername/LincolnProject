const express = require("express");
const {
  generateQRLink,
  generateBarcode,
} = require("../controllers/qrGeneration");

const router = express.Router();

router.route("/url").get(generateQRLink);
router.route("/code").get(generateBarcode);

module.exports = router;
