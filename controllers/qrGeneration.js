const { mapTermToTermObject } = require("../utils/helper");
const bwipjs = require("bwip-js");
const {
  checkPattern,
  formateDate,
  gs1Measurement,
} = require("../utils/formater");
const e = require("express");

exports.generateQRLink = async (req, res, next) => {
  const {
    urlStem,
    sscc,
    ginc,
    gsin,
    logisticWeight,
    lengthOfFirstDimension,
    widthOfSecondDimension,
    depthThicknessHeight,
    logisticVolume,
    shipToCompany,
    shipToContact,
    shipToAddressLine1,
    shipToAddressLine2,
    shipToSuburb,
    shipToLocality,
    shipToRegion,
    shipToCountryCode,
    shipToPostalCode,
    shipToPhoneNumber,
    shipToGeocode,
    returnToCompany,
    returnToContact,
    returnToAddressLine1,
    returnToAddressLine2,
    returnToSuburb,
    returnToLocality,
    returnToRegion,
    returnToCountryCode,
    returnToPostalCode,
    returnToPhoneNumber,
    serviceCodedescription,
    dangerousGoodsFlag,
    authorityToLeave,
    signitureRequire,
    notBeforeDeliveryDateTime,
    notAfterDeliveryDateTime,
    releaseDate,
    grai,
    routingCode,
    shipToGln,
    shipForGln,
  } = req.body;
  try {
    let qs = "";

    if (!urlStem || !sscc) {
      throw new Error("Missing url or/and sscc");
    }

    for (i in req.body) {
      const termObj = mapTermToTermObject(i);
      let val = req.body[i];

      if (typeof termObj !== "undefined" && val) {
        checkPattern(val, termObj);

        if (termObj.datatype.toLowerCase().includes("date")) {
          val = formateDate(val);
        }

        if (termObj.datatype.toLowerCase().includes("measurement")) {
          rv = gs1Measurement(val);
          termObj.code = termObj.code.replace("n", rv.ndp);
          val = rv.sixdigit;
        }

        if (i !== "sscc") {
          val = encodeURIComponent(val);

          val = val.replace(/\s/g, "+");
          qs = qs + termObj.code + "=" + val + "&";
        }
      }
    }

    qs = qs.replace(/.$/, "");

    const ssccTermObj = mapTermToTermObject("sscc");

    const dl =
      urlStem + "/" + ssccTermObj.code + "/" + sscc + "?" + qs + "&s4t";

    res.status(200).json({
      success: true,
      data: dl,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.generateBarcode = async (req, res, next) => {
  let { barcodeType, visualise } = req.body;
  const { url } = req.body;

  barcodeType = typeof barcodeType === "undefined" ? "qrcode" : barcodeType;
  visualise = typeof barcodeType === "undefined" ? false : visualise;

  bwipjs
    .toBuffer({
      bcid: barcodeType, // Barcode type
      text: url, // Text to encode
      includetext: true, // Show human-readable text
      textxalign: "center", // Always good to set this
    })
    .then((png) => {
      const img = "data:image/png;base64," + png.toString("base64");
      const visual = "<img src=" + img + " />";
      console.log(png);

      if (visualise) {
        res.send(visual);
      } else {
        res.status(200).json({
          success: true,
          image: img,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    });
};
