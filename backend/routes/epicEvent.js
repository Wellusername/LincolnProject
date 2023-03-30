const express = require("express");
const { generateEvent } = require("../controllers/epicEvent");

const router = express.Router();

router.route("/add-event").post(generateEvent);

module.exports = router;
