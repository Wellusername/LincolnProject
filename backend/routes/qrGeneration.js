const express = require("express");
const {
  generateQRLink,
  generateBarcode,
  generateBarcodeBuffered,
  gnerateURLAndBarcode,
} = require("../controllers/qrGeneration");

const router = express.Router();

router.route("/url").get(generateQRLink);
router.route("/url-and-code").get(gnerateURLAndBarcode);
router.route("/code").get(generateBarcode);
router.route("/code-buffer-image").get(generateBarcodeBuffered);

module.exports = router;
