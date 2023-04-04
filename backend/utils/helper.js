const e = require("express");
const { s4tTerms } = require("../resource/s4tTerms");

// https://example.com/00/195212342345678909?4300=fdsfssd&s4t

exports.mapTermToTermObject = (term) => {
  const item = s4tTerms.find((item, i) => {
    if (item.id === term) {
      return item;
    }
  });
  return item;
};

exports.extractUriStem = (digitalLink) => {
  var uriStem = "";
  let pathInfo = "";
  if (digitalLink !== undefined && digitalLink !== null && digitalLink !== "") {
    var inq = digitalLink.indexOf("?");
    if (inq == -1) {
      pathInfo = digitalLink;
    } else {
      pathInfo = digitalLink.substr(0, digitalLink.indexOf("?"));
    }

    var rePath = new RegExp("\\/(sscc|00|gsin|402|ginc|401)\\/(\\d{4}.+?)$");

    if (rePath.test(pathInfo)) {
      let l = pathInfo.match(rePath)[0].length;
      uriStem = pathInfo.substr(0, pathInfo.length - l);
    }
  }
  return uriStem;
};

exports.primaryValueExtract = (digitalLink) => {
  let pathInfo = "";
  let rv = {};
  let c = { "00": "SSCC", 402: "GSIN", 401: "GINC" };
  let digits = new RegExp("^\\d+$");
  if (digitalLink !== undefined && digitalLink !== null && digitalLink !== "") {
    var inq = digitalLink.indexOf("?");
    if (inq == -1) {
      pathInfo = digitalLink;
    } else {
      pathInfo = digitalLink.substr(0, digitalLink.indexOf("?"));
    }
    var rePath = new RegExp("\\/(sscc|00|gsin|402|ginc|401)\\/(\\d{4}.+?)$");
    if (rePath.test(pathInfo)) {
      let code = pathInfo.match(rePath)[1].toUpperCase();
      if (digits.test(code)) {
        code = c[code];
      }
      rv.code = code;
      rv.value = pathInfo.match(rePath)[2];
    } else {
      rv.code = "";
      rv.value = "";
    }
  }
  const result = {};
  result[rv.code] = rv.value;

  return result;
};

exports.extractInfoFromDigitalLink = (digitalLink) => {
  var qso = {};
  var uri = digitalLink;

  if (uri !== undefined && uri !== null && uri !== "") {
    if (uri.indexOf(" ") > -1) {
      uri = uri.substr(0, uri.indexOf(" "));
    }
    var qsa = uri.substr(1 - (0 - uri.indexOf("?"))).split("&");
    qsa.forEach(function (el) {
      if (el !== undefined) {
        var kv = el.split("=");
        if ((kv[1] !== null) & (kv[1] !== undefined)) {
          var v = kv[1].replace(/\+/g, "%20");
          const data = findItemWithCode(kv[0]);

          if (data.datatype === "gs1:Measurement") {
            const rv = gs1ToMeasurement(kv[0], decodeURIComponent(v));
            qso[rv.code] = rv.value;
            delete qso[kv[0]];
          } else if (data.datatype === "xsd:dateTime") {
            qso[kv[0]] = gs1date4(kv[1]);
          } else {
            qso[kv[0]] = decodeURIComponent(v);
          }
        }
      }
    });
  }
  return qso;
};

findItemWithCode = (code) => {
  return s4tTerms.find((item) => {
    if (item.code.slice(0, 2) === "33") {
      return item.code.slice(0, -1) === code.slice(0, -1);
    } else {
      return item.code === code;
    }
  });
};

gs1ToMeasurement = (code, val) => {
  var rv = {};
  rv.value = val / Math.pow(10, parseInt(code.slice(-1)));
  rv.code = code.slice(0, -1) + "n";
  return rv;
};

gs1date4 = (gs1Date) => {
  var rv = "";
  var regexDate = new RegExp("^\\d{6}|\\d{8}|\\d{10}$");
  if (gs1Date !== undefined && regexDate.test(gs1Date)) {
    var doubleDigits = gs1Date.split(/(\d{2})/);
    // TODO determine this correctly based on whether >=51 - see Gen Specs
    var year = parseInt(doubleDigits[1]);

    var currentYear = new Date().getFullYear().toString();
    var currentLastYY = parseInt(currentYear.substr(-2));
    var currentFirstYY = parseInt(currentYear.substr(0, 2));

    var diff = year - currentLastYY;
    var fullyear = currentFirstYY.toString() + year.toString();
    if (diff >= 51 && diff <= 99) {
      fullyear = (currentFirstYY - 1).toString() + year.toString();
    }
    if (diff >= -99 && diff <= -50) {
      fullyear = (currentFirstYY + 1).toString() + year.toString();
    }

    var hour = "00";
    var min = "00";
    if (gs1Date.length > 6) {
      hour = doubleDigits[7];
    }
    if (gs1Date.length > 8) {
      min = doubleDigits[9];
    }

    if (fullyear !== undefined) {
      rv =
        doubleDigits[5] +
        "/" +
        doubleDigits[3] +
        "/" +
        fullyear +
        " " +
        hour +
        ":" +
        min;
    }
  }
  console.log(rv);

  return rv;
};
