const {
  extractUriStem,
  primaryValueExtract,
  extractInfoFromDigitalLink,
} = require("../utils/helper");

exports.decodeUri = async (req, res, next) => {
  const { uri } = req.body;

  let result = {};

  try {
    result.urlStem = extractUriStem(uri);
    result = {
      ...result,
      ...primaryValueExtract(uri),
      ...extractInfoFromDigitalLink(uri),
    };

    res.status(200).json({
      success: true,
      info: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
