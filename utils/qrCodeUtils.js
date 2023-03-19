const { mapTermToTermObject } = require("../utils/helper");
const {
  checkPattern,
  formateDate,
  gs1Measurement,
} = require("../utils/formater");
const bwipjs = require("bwip-js");

exports.generateUrl = (reqBody) => {
  const { urlStem, sscc } = reqBody;
  let qs = "";

  if (!urlStem || !sscc) {
    throw new Error("Missing url or/and sscc");
  }

  for (i in reqBody) {
    const termObj = mapTermToTermObject(i);
    let val = reqBody[i];

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

  const dl = urlStem + "/" + ssccTermObj.code + "/" + sscc + "?" + qs + "&s4t";

  return dl;
};

exports.generateBarcodeUtil = async (barcodeType, url) => {
  try {
    const png = await bwipjs.toBuffer({
      bcid: barcodeType, // Barcode type
      text: url, // Text to encode
      includetext: true, // Show human-readable text
      textxalign: "center", // Always good to set this
    });
    return png;
  } catch (err) {
    throw err;
  }
};
