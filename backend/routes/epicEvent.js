const express = require("express");
const { generateEvent } = require("../controllers/epicEvent");
const { decodeUri } = require("../controllers/decoder");

const router = express.Router();

router.route("/add-event").post(generateEvent);

router.route("/decode").post(decodeUri);

module.exports = router;
