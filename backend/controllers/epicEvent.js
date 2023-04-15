const fs = require("fs");
var spread_sheet = require("spread_sheet");
const xmlConverter = require("../utils/xmlConverter");

exports.generateDigitalLink = async (req, res, next) => {
  const { epic, event } = req.body;

  let data = [[epic, event, new Date().toISOString()]];

  var filePath = "./data/record.csv";
  var sheetName = "Sheet1";

  spread_sheet.addRow(data, filePath, sheetName, function (err, result) {
    console.log(err, result);
    if (err) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    }
  });

  res.status(200).json({
    success: true,
  });
};

exports.generateAndPersistEPICSEventsInXml = async (req, res, next) => {
  const { eventData, eventType } = req.body;

  var result;
  try {
    if (eventType == "Object Event") {
      result = xmlConverter.convertToObjectEventXml(eventData);
    } else if (eventType == "Agrigation Event") {
      result = xmlConverter.convertToAggregationEventXml(eventData);
    } else if (eventType == "Transaction Event") {
      result = xmlConverter.convertToTransactionEventXml(eventData);
    } else if (eventType == "Transformation Event") {
      result = xmlConverter.convertToTransformEventXml(eventData);
    } else if (eventType == "Quantity Event") {
      result = xmlConverter.convertToQuantityEventXml(eventData);
    } else {
      res.status(400).json({
        success: false,
        message: "Event does not exist",
      });
    }
    console.log(result);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
