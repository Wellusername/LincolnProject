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
          qso[findId(kv[0])] = decodeURIComponent(v);
        }
      }
    });
  }
  return qso;
};

findId = (code) => {
  return s4tTerms.filter((item) => {
    if (
      typeof item.datatype !== "undefined" &&
      item.datatype === "gs1:Measurement"
    ) {
      return item.code.slice(0, -1) === code.slice(0, -1);
    } else {
      return item.code === code;
    }
  })[0].id;
};
