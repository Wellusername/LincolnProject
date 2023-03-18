const { mapTermToTermObject } = require("../utils/helper");

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

        if (i !== "sscc") {
          val = val.replace(/\s/g, "+");
          qs = qs + termObj.code + "=" + val + "?";
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

checkPattern = (val, termObj) => {
  if (typeof termObj.pattern !== "undefined") {
    var reg = new RegExp(termObj.pattern);

    console.log(val, reg, reg.test(val));

    if (!reg.test(val)) {
      throw new Error(termObj.id + " is not the right pattern");
    }
  }
};
