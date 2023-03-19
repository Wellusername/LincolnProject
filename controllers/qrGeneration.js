const { generateUrl, generateBarcodeUtil } = require("../utils/qrCodeUtils");
const bwipjs = require("bwip-js");

exports.generateQRLink = async (req, res, next) => {
  try {
    const url = generateUrl(req.body);

    res.status(200).json({
      success: true,
      data: url,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.generateBarcode = (req, res, next) => {
  let { barcodeType, visualise } = req.body;
  const { url } = req.body;

  barcodeType = typeof barcodeType === "undefined" ? "qrcode" : barcodeType;
  visualise = typeof barcodeType === "undefined" ? false : visualise;

  try {
    generateBarcodeUtil(barcodeType, url).then((bufferImage) => {
      console.log(bufferImage);

      const img = "data:image/png;base64," + bufferImage.toString("base64");
      const visual = "<img src=" + img + " />";
      console.log(visual);

      if (visualise) {
        res.send(visual);
      } else {
        res.status(200).json({
          success: true,
          image: img,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.generateBarcodeBuffered = (req, res, next) => {
  let { barcodeType, visualise } = req.body;
  const { url } = req.body;

  barcodeType = typeof barcodeType === "undefined" ? "qrcode" : barcodeType;
  visualise = typeof barcodeType === "undefined" ? false : visualise;

  try {
    generateBarcodeUtil(barcodeType, url).then((bufferImage) => {
      res.status(200).json({
        success: true,
        image: bufferImage,
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
