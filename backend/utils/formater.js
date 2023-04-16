exports.checkPattern = (val, termObj) => {
  if (typeof termObj.pattern !== "undefined") {
    var reg = new RegExp(termObj.pattern);


    if (!reg.test(val)) {
      throw new Error(termObj.id + " is not the right pattern");
    }
  }
};

exports.formateDate = (time) => {
  time = time.replace(/\D/g, "");
  time = time.substring(2);
  return time;
};

exports.gs1Measurement = (val) => {
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
