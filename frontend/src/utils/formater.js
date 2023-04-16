import { timeZonesWithTime } from "../consonants/Timezones";

export function newEpcisEventDataInputFormatter(userInputData) {
  validation(userInputData);
  const base = formGenericEpcisData(userInputData);
  let result = { ...base };

  if (userInputData.eventType1 === "Object Event") {
    result = { ...result, ...formobjectEvent(userInputData) };
  } else if (userInputData.eventType1 === "Agrigation Event") {
    result = { ...result, ...formAggregationEvent(userInputData) };
  } else if (userInputData.eventType1 === "Transaction Event") {
    result = { ...result, ...formTrasactionEvent(userInputData) };
  } else if (userInputData.eventType1 === "Transformation Event") {
    result = { ...result, ...formTransformationEvent(userInputData) };
  } else if (userInputData.eventType1 === "Quantity Event") {
    result = { ...result, ...formQuantityEvent(userInputData) };
  }

  return result;
}

function formobjectEvent(userInputData) {
  validateAction(userInputData.action);

  if (userInputData.ePCs.length <= 0) {
    throw new Error("EPCs cannot be empty");
  }

  if (checkNull(userInputData.action)) {
    throw new Error("Action cannot be empty");
  }

  let result = {
    action: userInputData.action,
    epcList: {
      epc: processEPC(userInputData.ePCs),
    },
  };

  if (userInputData.quantities.length > 0) {
    result = {
      ...result,
      quantityElement: processQuantities(userInputData.quantities),
    };
  }

  result = addOptional(result, userInputData);

  return result;
}

function formAggregationEvent(userInputData) {
  validateAction(userInputData.action);

  if (userInputData.childEPCs.length <= 0) {
    throw new Error("EPCs cannot be empty");
  }

  if (checkNull(userInputData.action)) {
    throw new Error("Action cannot be empty");
  }

  let result = {
    parentID: processEPC([userInputData.parentId])[0],
    childEPCs: processEPC(userInputData.childEPCs),
    action: userInputData.action,
  };

  if (userInputData.childQuantities.length > 0) {
    result = {
      ...result,
      childQuantityList: processQuantities(userInputData.childQuantities),
    };
  }

  result = addOptional(result, userInputData);
  return result;
}

function formTrasactionEvent(userInputData) {
  validateAction(userInputData.action);

  if (userInputData.ePCs.length <= 0) {
    throw new Error("EPCs cannot be empty");
  }

  if (userInputData.quantities.length <= 0) {
    throw new Error("Quantities cannot be empty");
  }

  if (checkNull(userInputData.action)) {
    throw new Error("Action cannot be empty");
  }

  let result = {
    parentID: processEPC([userInputData.parentId])[0],

    action: userInputData.action,
    epcList: {
      epc: processEPC(userInputData.ePCs),
    },
    quantityList: {
      quantityElement: processQuantities(userInputData.quantities),
    },
  };

  result = addOptional(result, userInputData);

  return result;
}

function formTransformationEvent(userInputData) {
  let result;

  if (userInputData.inputEPCs.length > 0) {
    result = {
      ...result,
      inputEPCList: {
        epc: processEPC(userInputData.inputEPCs),
      },
    };
  }

  if (userInputData.outputEPCs.length > 0) {
    result = {
      ...result,
      outputEPCList: {
        epc: processEPC(userInputData.outputEPCs),
      },
    };
  }

  if (userInputData.inputQuantities.length > 0) {
    result = {
      ...result,
      inputQuantityList: {
        quantityElement: processQuantities(userInputData.inputQuantities),
      },
    };
  }

  if (userInputData.outputQuantities.length > 0) {
    result = {
      ...result,
      outputQuantityList: {
        quantityElement: processQuantities(userInputData.outputQuantities),
      },
    };
  }
  result = addOptional(result, userInputData);

  if (!checkNull(userInputData.xformId)) {
    result = {
      ...result,
      xformId: userInputData.xformId,
    };
  }

  return result;
}

function formQuantityEvent(userInputData) {
  if (userInputData.quantities.length <= 0) {
    throw new Error("Quantities cannot be empty");
  }

  let result = {
    quantityList: {
      quantityElement: processQuantities(userInputData.quantities),
    },
  };

  result = addOptional(result, userInputData);

  return result;
}

function addOptional(result, userInputData) {
  if (!checkNull(userInputData.businessStep)) {
    result = { ...result, bizStep: userInputData.businessStep };
  }

  if (!checkNull(userInputData.disposition)) {
    result = { ...result, disposition: userInputData.disposition };
  }

  if (!checkNull(userInputData.readPoint.s4tType)) {
    result = {
      ...result,
      readPoint: processReadPoint(userInputData.readPoint),
    };
  }

  if (!checkNull(userInputData.businessLocation.s4tType)) {
    result = {
      ...result,
      bizLocation: processReadPoint(userInputData.businessLocation),
    };
  }

  if (
    !checkNull(userInputData.bizTransactions) &&
    userInputData.bizTransactions.length > 0
  ) {
    result = {
      ...result,
      bizTransactions: processExtensions(
        userInputData.bizTransactions,
        "bizTransactionList"
      ),
    };
  }

  if (!checkNull(userInputData.sources) && userInputData.sources.length > 0) {
    result = {
      ...result,
      sourceList: processExtensions(userInputData.sources, "sourceList"),
    };
  }

  if (
    !checkNull(userInputData.destinations) &&
    userInputData.destinations.length > 0
  ) {
    result = {
      ...result,
      destinationList: processExtensions(
        userInputData.destinations,
        "destinationList"
      ),
    };
  }

  return result;
}

function formGenericEpcisData(userInputData) {
  var genericEpcisData = {
    eventTime: processTime(userInputData.eventTime),
    recordTime: processTime(userInputData.recordTime),
    eventTimeZoneOffset: getTimeZoneVal(userInputData.eventTimeTimeZone),
  };

  if (userInputData.eventType2 === "Error Declaration") {
    checkNotNullError(userInputData.declarationTime, "declarationTime");

    let errorDeclaration = {
      declarationTime: processTime(userInputData.declarationTime),
    };

    errorDeclaration = addOptionalInput(
      errorDeclaration,
      userInputData.reason,
      {
        reason: userInputData.reason,
      }
    );
    errorDeclaration = addOptionalInputArrary(
      errorDeclaration,
      userInputData.correctiveEventIds,
      {
        correctiveEventIds: userInputData.correctiveEventIds,
      }
    );
    let baseExtension = {
      baseExtension: {
        errorDeclaration: errorDeclaration,
      },
    };

    baseExtension = addOptionalInput(baseExtension, userInputData.eventId, {
      eventId: userInputData.eventId,
    });

    genericEpcisData = { ...genericEpcisData, baseExtension: baseExtension };
  } else if (!checkNull(userInputData.eventId)) {
    genericEpcisData = {
      ...genericEpcisData,
      baseExtension: {
        baseExtension: { eventId: userInputData.eventId },
      },
    };
  }

  return genericEpcisData;
}

function processEPC(epcs) {
  return epcs.map((epc) => {
    let number;
    if (epc.s4tType === "sscc") {
      number = epc["Al00"];

      if (number.length != 18) {
        throw new Error("sscc length must 18");
      }
      number = number.slice(0, 18);
      const prefix = Number(epc.GS1CompanyPrefix) + 1;
      const fristNumber = number.slice(0, 1);
      const firstSection = number.slice(1, prefix);
      const secondSection = number.slice(prefix, number.length - 1);
      number = firstSection + "." + fristNumber + secondSection;
    } else if (epc.s4tType === "grai") {
      number = epc["Al8003"];
      if (number.length < 16) {
        throw new Error("grai length must be greater than 16");
      }
      const prefix = Number(epc.GS1CompanyPrefix);
      const firstSection = number.slice(0, prefix);
      const secondSection = number.slice(prefix, 12);
      const lastSection = number.slice(11);
      number = firstSection + "." + secondSection + "." + lastSection;
    } else if (epc.s4tType === "ginc") {
      number = epc["Al401"];
      const prefix = Number(epc.GS1CompanyPrefix);

      if (number.length < prefix && number.length > 30) {
        throw new Error(
          "GINC must be between " + prefix + " and 30 alphanumeric characters"
        );
      }

      number = processNormalEpcNumber(prefix, number);
    } else if (epc.s4tType === "sgtin") {
      let number1 = epc["Al01"].slice(0, 14);
      let number2 = epc["Al02"];
      if (number1.length != 14) {
        throw new Error("GTIN must be 14 digits");
      }

      if (number2.length == 0) {
        throw new Error("Missing Serial");
      }
      const prefix = Number(epc.GS1CompanyPrefix) + 1;
      const fristNumber = number1.slice(0, 1);
      const firstSection = number1.slice(1, prefix);
      const secondSection = number1.slice(prefix, number1.length - 1);
      number = firstSection + "." + fristNumber + secondSection + "." + number2;
    } else if (epc.s4tType === "giai") {
      number = epc["Al8004"];
      const prefix = Number(epc.GS1CompanyPrefix);

      if (number.length < prefix && number.length > 30) {
        throw new Error(
          "Giai must be between " + prefix + " and 30 alphanumeric characters"
        );
      }

      number = processNormalEpcNumber(prefix, number);
    } else if (epc.s4tType === "gsrn") {
      number = epc["Al8018"].slice(0, 18);
      const prefix = Number(epc.GS1CompanyPrefix);

      if (number.length != 18) {
        throw new Error("	GSRN must be 18 digits");
      }

      number = processNormalEpcNumber(prefix, number).slice(0, number.length);
    } else if (epc.s4tType === "gsrnp") {
      number = epc["Al8017"].slice(0, 18);
      const prefix = Number(epc.GS1CompanyPrefix);

      if (number.length != 18) {
        throw new Error("	GSRNP must be 18 digits");
      }

      number = processNormalEpcNumber(prefix, number).slice(0, number.length);
    } else if (epc.s4tType === "gdti") {
      number = epc["Al253"];
      const prefix = Number(epc.GS1CompanyPrefix);
      if (number.length < 13 && number.length > 30) {
        throw new Error(
          "GDTI with Serial must be 13 digits followed by 1 to 17 alphanumeric characters"
        );
      }
      number = processNormalEpcNumber(prefix, number);
      number = number.slice(0, number.length - 2);
      number = number.slice(0, 13) + "." + number.slice(14);
    } else if (epc.s4tType === "sgcn") {
      number = epc["Al255"];
      const prefix = Number(epc.GS1CompanyPrefix);
      if (number.length < 13 && number.length > 30) {
        throw new Error(
          "SGCN with Serial must be 14 digits followed by 1 to 25 alphanumeric characters"
        );
      }
      const first = number.slice(0, 12);
      const first1 = first.slice(0, prefix);
      const first2 = first.slice(prefix);
      const secondSection = number.slice(13);
      number = first1 + "." + first2 + "." + secondSection;
    } else if (epc.s4tType === "cpi") {
      const number1 = epc["Al8010"];
      const number2 = epc["Al8011"];
      const prefix = Number(epc.GS1CompanyPrefix);
      if (number1.length < prefix && number1.length > 30) {
        throw new Error(
          "COI must be between " + prefix + " and 30 alphanumeric characters"
        );
      }

      if (number2.length < 1) {
        throw new Error("Missing Serial");
      }

      number = processNormalEpcNumber(prefix, number1) + "." + number2;
    } else if (epc.s4tType === "gsin") {
      number = epc["Al402"].slice(0, 17);
      const prefix = Number(epc.GS1CompanyPrefix);

      if (number.length != 17) {
        throw new Error("	GSIN must be 17 digits");
      }

      number = processNormalEpcNumber(prefix, number).slice(0, number.length);
    } else if (epc.s4tType === "itip") {
      const number1 = epc["Al8006"];
      const number2 = epc["Al21"];
      const prefix = Number(epc.GS1CompanyPrefix);
      if (number1.length != 18) {
        throw new Error("ITIP must be 18 digits");
      }

      if (number2.length < 1) {
        throw new Error("Missing Serial");
      }

      const first = number1.slice(0, 16);
      const first1 = first.slice(1, prefix + 1);
      const first2 = first.slice(prefix + 1, first.length - 3);
      const first3 = first.slice(first.length - 2);
      number =
        first1 +
        "." +
        first.slice(0, 1) +
        first2 +
        "." +
        first3 +
        "." +
        number1.slice(16) +
        "." +
        number2;
    } else if (epc.s4tType === "upui") {
      const number1 = epc["Al01"];
      const number2 = epc["Al235"];
      const prefix = Number(epc.GS1CompanyPrefix);
      if (number1.length != 14) {
        throw new Error("UPUI must be 14 digits");
      }

      if (number2.length < 1) {
        throw new Error("Missing TPX");
      }

      number =
        number1.slice(1, prefix + 1) +
        "." +
        number1.slice(0, 1) +
        number1.slice(prefix + 1, number1.length - 1) +
        "." +
        number2;
    } else if (epc.s4tType === "gid") {
      const number1 = epc["Mgr"];
      const number2 = epc["Class"];
      const number3 = epc["Ser"];
      if (number1.length < 1 || number2.length < 1 || number3.length < 1) {
        throw new Error("nvalid syntax");
      }
      number = number1 + "." + number2 + "." + number3;
    } else if (epc.s4tType === "usdod") {
      const number1 = epc["CAGE/DoDAAC"];
      const number2 = epc["Serial"];
      if (number1.length < 5 || number2.length < 1) {
        throw new Error(
          "CAGE/DoDAAC has incorrect number of characters or no Serial"
        );
      }
      number = number1 + "." + number2;
    } else if (epc.s4tType === "adi") {
      const number1 = epc["CAGE/DoDAAC"];
      const number2 = epc["PNO"];
      const number3 = epc["SER"];

      if (number1.length < 5) {
        throw new Error("CAGE/DoDAAC has incorrect number of characters");
      }

      if (number2.length < 1 || number3.length < 1) {
        throw new Error("nvalid syntax");
      }
      number = number1 + "." + number2 + "." + number3;
    } else if (epc.s4tType === "bic") {
      number = epc["BIC"];
    } else if (epc.s4tType === "imovn") {
      number = epc["IMOVN"];
    } else {
      return epc["URI"];
    }

    return "urn:epc:id:" + epc.s4tType + ":" + number;
  });
}

function processQuantities(quantities) {
  return quantities.map((q) => {
    let number = "";
    if (q.s4tType === "lgtin") {
      const number1 = q["Al01"];
      const number2 = q["Al10"];

      if (number1.length != 14) {
        throw new Error("GTIN must be 14 digits");
      }
      if (number2.length == 0) {
        throw new Error("Missing Batch/Lot");
      }

      const prefix = Number(q.GS1CompanyPrefix);
      const fristNumber = number1.slice(0, 1);
      const firstSection = number1.slice(1, prefix + 1);
      const secondSection = number1.slice(prefix + 1, number1.length - 1);
      number =
        "urn:epc:class:lgtin:" +
        firstSection +
        "." +
        fristNumber +
        secondSection +
        "." +
        number2;
    } else if (q.s4tType === "sgtin") {
      const number1 = q["Al01"];

      if (number1.length != 14) {
        throw new Error("GTIN must be 14 digits");
      }

      const prefix = Number(q.GS1CompanyPrefix);
      const fristNumber = number1.slice(0, 1);
      const firstSection = number1.slice(1, prefix + 1);
      const secondSection = number1.slice(prefix + 1, number1.length - 1);
      number =
        "urn:epc:idpat:sgtin:" +
        firstSection +
        "." +
        fristNumber +
        secondSection +
        ".*";
    } else if (q.s4tType === "grai") {
      const number1 = q["Al8003"];

      if (number1.length < 14 || number1.length > 30) {
        throw new Error(
          "GRAI with Serial must be 14 digits followed by 1 to 16 alphanumeric characters"
        );
      }

      const prefix = Number(q.GS1CompanyPrefix);
      const firstSection = number1.slice(0, prefix);
      const secondSection = number1.slice(prefix, 12);
      number =
        "urn:epc:idpat:grai:" + firstSection + "." + secondSection + ".*";
    } else if (q.s4tType === "gdti") {
      const number1 = q["Al253"];

      if (number1.length < 13 || number1.length > 30) {
        throw new Error("GDTI with no Serial must be 13 digits f");
      }

      const prefix = Number(q.GS1CompanyPrefix);
      const firstSection = number1.slice(0, prefix);
      const secondSection = number1.slice(prefix, 13);
      number =
        "urn:epc:idpat:gdti:" + firstSection + "." + secondSection + ".*";
    } else if (q.s4tType === "sgcn") {
      const number1 = q["Al255"];

      if (number1.length != 13) {
        throw new Error("GDTI With no Serial must be 13 digit");
      }

      const prefix = Number(q.GS1CompanyPrefix);
      const firstSection = number1.slice(0, prefix);
      const secondSection = number1.slice(prefix, 13);
      number =
        "urn:epc:idpat:sgcn:" + firstSection + "." + secondSection + ".*";
    } else if (q.s4tType === "cpi") {
      const number1 = q["Al8010"];
      const prefix = Number(q.GS1CompanyPrefix);

      if (number1.length < prefix && number1.length > 30) {
        throw new Error("CPI must be between " + prefix + " and 30 digits");
      }

      number =
        "urn:epc:idpat:cpi:" + processNormalEpcNumber(prefix, number1) + ".*";
    } else if (q.s4tType === "itip") {
      const number1 = q["Al8006"];

      if (number1.length != 18) {
        throw new Error("ITIP must be 18 digits");
      }

      const prefix = Number(q.GS1CompanyPrefix);
      const fristNumber = number1.slice(0, 1);
      const firstSection = number1.slice(1, 13);
      const first = firstSection.slice(0, prefix);
      const second = firstSection.slice(prefix, firstSection.length);
      const third = number1.slice(14, 16);
      const fourth = number1.slice(16, 18);
      number =
        "urn:epc:idpat:itip:" +
        first +
        "." +
        fristNumber +
        second +
        "." +
        third +
        "." +
        fourth +
        ".*";
    } else if (q.s4tType === "upui") {
      const number1 = q["Al01"];

      if (number1.length != 14) {
        throw new Error("UPUI must be 14 digits");
      }

      const prefix = Number(q.GS1CompanyPrefix);
      const fristNumber = number1.slice(0, 1);
      const firstSection = number1.slice(1, prefix + 1);
      const secondSection = number1.slice(prefix + 1, number1.length - 1);
      number =
        "urn:epc:idpat:upui:" +
        firstSection +
        "." +
        fristNumber +
        secondSection +
        ".*";
    } else {
      number = q["uri"];
    }
    const epcClass = number;
    let result = { epcClass: epcClass };
    if (q.quantityType != "Unspecified Quantity") {
      result = { ...result, quantity: q.quantity };
    }
    if (q.quantityType == "Variable Measure Quantity") {
      result = { ...result, uom: q.uom };
    }

    return result;
  });
}

function processReadPoint(readPoint) {
  if (readPoint.s4tType == "uri") {
    return readPoint["uri"];
  } else {
    const number1 = readPoint["Al414"];
    const number2 = readPoint["Al254"];
    const prefix = Number(readPoint.GS1CompanyPrefix);

    if (number1.length < 13) {
      throw new Error("GLN must be 13 digits");
    }
    if (number2.length < 1) {
      throw new Error("Missing Serial");
    }
    const number =
      processNormalEpcNumber(prefix, number1.slice(0, 12)) + "." + number2;
    return "urn:epc:id:sgln:" + number;
  }
}

function processExtensions(extensions, typeName) {
  let type;
  let uri;
  if (typeName === "bizTransactionList") {
    type = "businessTransactionType";
    uri = "businessTransactionURI";
  } else if (typeName === "sourceList") {
    type = "sourceType";
    uri = "sourceURI";
  } else {
    type = "destinationType";
    uri = "destinationURI";
  }

  return extensions.map((ex) => processExtension(ex[type], ex[uri]));
}

function processExtension(type, uri) {
  return {
    _: uri,
    $: {
      type: type,
    },
  };
}

function processNormalEpcNumber(prefix, number) {
  const firstSection = number.slice(0, prefix);
  const secondSection = number.slice(prefix);
  return (number = firstSection + "." + secondSection);
}

function processTime(time) {
  const date = new Date(time);
  // Create a new date object with the desired date and time

  // Get the time zone offset in minutes
  const timeZoneOffsetInMinutes = 780; // +13:00 hours from UTC
  const timeZoneOffsetInMilliseconds = timeZoneOffsetInMinutes * 60 * 1000;

  // Get the date and time string in ISO 8601 format with the UTC time zone
  const isoStringWithUtcOffset = date.toISOString();

  // Modify the date and time string to include the desired time zone offset
  const formattedDateTimeString =
    isoStringWithUtcOffset.slice(0, -1) +
    `${timeZoneOffsetInMinutes < 0 ? "-" : "+"}${Math.abs(
      Math.floor(timeZoneOffsetInMinutes / 60)
    )
      .toString()
      .padStart(2, "0")}:${Math.abs(timeZoneOffsetInMinutes % 60)
      .toString()
      .padStart(2, "0")}`;

  return formattedDateTimeString;
}

function getTimeZoneVal(timeZoneName) {
  const timeZoneTime = timeZonesWithTime.filter(
    (i) => i.name == timeZoneName
  )[0].val;
  return timeZoneTime;
}

function validation(userInputData) {
  if (
    userInputData.eventTime === "" ||
    userInputData.eventTime === null ||
    typeof userInputData.eventTime === undefined
  ) {
    throw new Error("Event cannot be empty");
  }
}

function checkNotNullError(val, name) {
  if (val === "" || val === null || val === undefined) {
    throw new Error(name + " cannot be empty");
  }
}

function checkNull(val) {
  if (val == "") {
    return true;
  } else if (val === "null") {
    return true;
  } else if (val === null) {
    return true;
  } else if (val == undefined) {
    return true;
  } else {
    return false;
  }
}

function addOptionalInput(original, val, optionalInput) {
  if (!checkNull(val)) {
    return { ...original, ...optionalInput };
  } else {
    return { ...original };
  }
}

function addOptionalInputArrary(original, val, optionalInputArray) {
  if (!checkNull(val) && val > 0) {
    return { ...original, ...optionalInputArray };
  } else {
    return { ...original };
  }
}

function validateAction(action) {
  let valid = false;
  if (checkNull(action)) {
    throw new Error("Action cannot be empty");
  } else if (action == "ADD") {
    valid = true;
  } else if (action !== "OBSERVE") {
    valid = true;
  } else if (action !== "DELETE") {
    valid = true;
  }

  if (!valid) {
    throw new Error("Action cannot be empty");
  }
}
