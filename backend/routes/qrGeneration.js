const express = require("express");
const {
  generateQRLink,
  generateBarcode,
  generateBarcodeBuffered,
  gnerateURLAndBarcode,
} = require("../controllers/qrGeneration");

const router = express.Router();

router.route("/url").post(generateQRLink);
router.route("/url-and-code").post(gnerateURLAndBarcode);
router.route("/code").post(generateBarcode);
router.route("/code-buffer-image").post(generateBarcodeBuffered);

module.exports = router;
