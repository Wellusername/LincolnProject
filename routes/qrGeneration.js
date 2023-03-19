const express = require("express");
const {
  generateQRLink,
  generateBarcode,
  generateBarcodeBuffered,
} = require("../controllers/qrGeneration");

const router = express.Router();

router.route("/url").get(generateQRLink);
router.route("/code").get(generateBarcode);
router.route("/codeBufferImage").get(generateBarcodeBuffered);

module.exports = router;
