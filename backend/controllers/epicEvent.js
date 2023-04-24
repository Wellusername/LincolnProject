const fs = require("fs");
var spread_sheet = require("spread_sheet");
const xmlConverter = require("../utils/xmlConverter");
const {
  newEpcisEventDataInputFormatter,
} = require("../utils/eventDataProcessor");

exports.generateDigitalLink = async (req, res, next) => {
  const { epic, event } = req.body;

  let data = [[epic, event, new Date().toISOString()]];

  var filePath = "./data/record.csv";
  var sheetName = "Sheet1";

  spread_sheet.addRow(data, filePath, sheetName, function (err, result) {
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
  let { eventData, eventType } = req.body;

  var result;
  try {
    eventData = newEpcisEventDataInputFormatter(eventData);

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

    res.status(200).json({
      success: true,
      data: result,
    });

    try {
      // Data which will write in a file.
      let data = "Learning how to write in a file.";

      // Write data in 'Output.txt' .
      const name = "result" + ".txt";
      console.log(name);
      fs.writeFile("./data/" + name, result, (err) => {
        // In case of a error throw err.
        if (err) throw err;
      });
    } catch (e) {}
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.generateAndPersistEPICSEventsInXmlWithURI = async (req, res, next) => {
  let { eventData, eventType } = req.body;

  var result;
  try {
    eventData = newEpcisEventDataInputFormatter(eventData);

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

    res.status(200).json({
      success: true,
      data: result,
    });

    try {
      // Data which will write in a file.
      let data = "Learning how to write in a file.";

      // Write data in 'Output.txt' .
      const name = "result" + ".txt";
      console.log(name);
      fs.writeFile("./data/" + name, result, (err) => {
        // In case of a error throw err.
        if (err) throw err;
      });
    } catch (e) {}
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
