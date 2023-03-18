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

checkPattern = (val, termObj) => {
  if (typeof termObj.pattern !== "undefined") {
    var reg = new RegExp(termObj.pattern);

    console.log(val, reg, reg.test(val));

    if (!reg.test(val)) {
      throw new Error(termObj.id + " is not the right pattern");
    }
  }
};

formateDate = (time) => {
  time = time.replace(/\D/g, "");
  time = time.substring(2);
  return time;
};

gs1Measurement = (val) => {
  var ndp = 0;
  var rv = {};
  var numeric = "";
  if (val.indexOf(".") > -1) {
    var parts = val.split(".");
    ndp = parts[1].length;
    numeric = parts[0] + parts[1];
  } else {
    numeric = val;
  }
  if (numeric.length < 6) {
    numeric = "0".repeat(6 - numeric.length) + numeric;
  }

  rv.ndp = ndp;
  rv.sixdigit = numeric;
  return rv;
};
