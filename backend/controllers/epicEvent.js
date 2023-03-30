const fs = require("fs");

exports.generateEvent = async (req, res, next) => {
  const { epic, event } = req.body;

  let data = "\n" + epic + " " + event + " " + new Date().toISOString();

  fs.appendFile("./data/record.txt", data, (err) => {
    // In case of a error throw err.
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
