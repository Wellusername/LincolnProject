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

  let qs = "";

  for (i in req.body) {
    if (i !== "sscc") {
      const termObj = mapTermToTermObject(i);
      if (typeof termObj !== "undefined") {
        const val = req.body[i];
        qs = qs + "?" + termObj.code + "=" + val;
      }
    }
  }

  const ssccTermObj = mapTermToTermObject("sscc");
  console.log(ssccTermObj);

  const dl = urlStem + "/" + ssccTermObj.code + "/" + sscc + qs + "&s4t";

  try {
    res.status(200).json({
      success: true,
      data: dl,
    });
  } catch (e) {
    next(e);
  }
};
