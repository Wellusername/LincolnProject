const fs = require("fs");
var spread_sheet = require("spread_sheet");

exports.generateEvent = async (req, res, next) => {
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
