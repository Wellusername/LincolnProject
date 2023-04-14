const express = require("express");
const {
  generateDigitalLink,
  generateAndPersistEPICSEventsInXml,
} = require("../controllers/epicEvent");
const { decodeUri } = require("../controllers/decoder");

const router = express.Router();

router.route("/add-digital-link").post(generateDigitalLink);

router.route("/decode").post(decodeUri);

router.route("/add-event").post(generateAndPersistEPICSEventsInXml);

module.exports = router;
