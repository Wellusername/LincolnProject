const xml2js = require("xml2js");

const epciEventDocument = {
  "xmlns:epcis": "urn:epcglobal:epcis:xsd:1",
  schemaVersion: "1.2",
  creationDate: new Date().toISOString(),
};

exports.convertToObjectEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });
  let objectEvent = {
    eventTime: eventJson.eventTime,
    recordTime: eventJson.recordTime,
    eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
    ...eventJson.baseExtension,
    epcList: eventJson.epcList,
    action: eventJson.action,
  };

  if (eventJson.bizStep !== undefined) {
    objectEvent = { ...objectEvent, bizStep: eventJson.bizStep };
  }

  if (eventJson.disposition !== undefined) {
    objectEvent = { ...objectEvent, disposition: eventJson.disposition };
  }

  if (eventJson.readPoint !== undefined) {
    objectEvent = {
      ...objectEvent,
      readPoint: {
        id: eventJson.readPoint,
      },
    };
  }
  if (eventJson.bizLocation !== undefined) {
    objectEvent = {
      ...objectEvent,
      bizLocation: {
        id: eventJson.bizLocation,
      },
    };
  }

  if (eventJson.bizTransactions !== undefined) {
    objectEvent = {
      ...objectEvent,
      bizTransactionList: { bizTransaction: eventJson.bizTransactions },
    };
  }

  let extensions = {};


  if (eventJson.quantityElement !== undefined) {
    extensions = {
      ...extensions,
      quantityList: { quantityElement: eventJson.quantityElement },
    };
  }
  if (eventJson.sourceList !== undefined) {
    extensions = {
      ...extensions,
      sourceList: { sourceList: eventJson.sourceList },
    };
  }

  if (eventJson.destinationList !== undefined) {
    extensions = {
      ...extensions,
      destinationList: { destinationList: eventJson.destinationList },
    };
  }

  if (JSON.stringify(extensions) !== "{}") {
    objectEvent = { ...objectEvent, extension: extensions };
  }

  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        ObjectEvent: objectEvent,
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};

exports.convertToAggregationEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });
  let aggregationEvent = {
    eventTime: eventJson.eventTime,
    recordTime: eventJson.recordTime,
    eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
    ...eventJson.baseExtension,
    parentID: eventJson.parentID,
    childEPCs: { epc: eventJson.childEPCs },
    action: eventJson.action,
  };

  if (eventJson.bizStep !== undefined) {
    aggregationEvent = { ...aggregationEvent, bizStep: eventJson.bizStep };
  }

  if (eventJson.disposition !== undefined) {
    aggregationEvent = {
      ...aggregationEvent,
      disposition: eventJson.disposition,
    };
  }

  if (eventJson.readPoint !== undefined) {
    aggregationEvent = {
      ...aggregationEvent,
      readPoint: {
        id: eventJson.readPoint,
      },
    };
  }
  if (eventJson.bizLocation !== undefined) {
    aggregationEvent = {
      ...aggregationEvent,
      bizLocation: {
        id: eventJson.bizLocation,
      },
    };
  }

  if (eventJson.bizTransactions !== undefined) {
    aggregationEvent = {
      ...aggregationEvent,
      bizTransactionList: { bizTransaction: eventJson.bizTransactions },
    };
  }

  let extensions = {};

  if (eventJson.childQuantityList !== undefined) {
    extensions = {
      ...extensions,
      childQuantityList: eventJson.childQuantityList,
    };
  }

  if (eventJson.sourceList !== undefined) {
    extensions = {
      ...extensions,
      sourceList: { source: eventJson.sourceList },
    };
  }

  if (eventJson.destinationList !== undefined) {
    extensions = {
      ...extensions,
      destinationList: { destination: eventJson.destinationList },
    };
  }

  if (JSON.stringify(extensions) !== "{}") {
    aggregationEvent = { ...aggregationEvent, extension: extensions };
  }

  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        AggregationEvent: aggregationEvent,
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};

exports.convertToTransactionEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });

  let transactionEvent = {
    eventTime: eventJson.eventTime,
    recordTime: eventJson.recordTime,
    eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
    ...eventJson.baseExtension,
    bizTransactionList: { bizTransaction: eventJson.bizTransactions },
    parentID: eventJson.parentID,
    epcList: eventJson.epcList,
    action: eventJson.action,
  };

  if (eventJson.bizStep !== undefined) {
    transactionEvent = { ...transactionEvent, bizStep: eventJson.bizStep };
  }

  if (eventJson.disposition !== undefined) {
    transactionEvent = {
      ...transactionEvent,
      disposition: eventJson.disposition,
    };
  }

  if (eventJson.readPoint !== undefined) {
    transactionEvent = {
      ...transactionEvent,
      readPoint: {
        id: eventJson.readPoint,
      },
    };
  }
  if (eventJson.bizLocation !== undefined) {
    transactionEvent = {
      ...transactionEvent,
      bizLocation: {
        id: eventJson.bizLocation,
      },
    };
  }

  let extensions = {};

  if (eventJson.quantityList) {
    extensions = {
      ...extensions,
      quantityList: eventJson.quantityList,
    };
  }
  if (eventJson.sourceList !== undefined) {
    extensions = {
      ...extensions,
      sourceList: { sourceList: eventJson.sourceList },
    };
  }

  if (eventJson.destinationList !== undefined) {
    extensions = {
      ...extensions,
      destinationList: { destinationList: eventJson.destinationList },
    };
  }

  if (JSON.stringify(extensions) !== "{}") {
    transactionEvent = { ...transactionEvent, extension: extensions };
  }

  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        TransactionEvent: transactionEvent,
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};

exports.convertToTransformEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });

  let extension = {
    eventTime: eventJson.eventTime,
    recordTime: eventJson.recordTime,
    eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
    ...eventJson.baseExtension,
  };

  if (eventJson.inputEPCList !== undefined) {
    extension = {
      ...extension,
      inputEPCList: eventJson.inputEPCList,
    };
  }

  if (eventJson.inputQuantityList !== undefined) {
    extension = {
      ...extension,
      inputQuantityList: eventJson.inputQuantityList,
    };
  }
  if (eventJson.outputEPCList !== undefined) {
    extension = {
      ...extension,
      outputEPCList: eventJson.outputEPCList,
    };
  }

  if (eventJson.outputQuantityList !== undefined) {
    extension = {
      ...extension,
      outputQuantityList: eventJson.outputQuantityList,
    };
  }

  if (eventJson.bizStep !== undefined) {
    extension = {
      ...extension,
      bizStep: eventJson.bizStep,
    };
  }

  if (eventJson.disposition !== undefined) {
    extension = {
      ...extension,
      disposition: eventJson.disposition,
    };
  }

  if (eventJson.readPoint !== undefined) {
    extension = {
      ...extension,
      readPoint: {
        id: eventJson.readPoint,
      },
    };
  }
  if (eventJson.bizLocation !== undefined) {
    extension = {
      ...extension,
      bizLocation: {
        id: eventJson.bizLocation,
      },
    };
  }
  if (eventJson.bizTransactions !== undefined) {
    extension = {
      ...extension,
      bizTransactionList: { bizTransaction: eventJson.bizTransactions },
    };
  }

  if (eventJson.xformId !== undefined) {
    extension = {
      ...extension,
      transformationID: eventJson.xformId,
    };
  }

  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        extension: { TransformationEvent: extension },
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};

exports.convertToQuantityEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });
  let quantityEvent = {
    eventTime: eventJson.eventTime,
    recordTime: eventJson.recordTime,
    eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
    ...eventJson.baseExtension,
    epcClass: eventJson.quantityList.quantityElement[0].epcClass,
    quantity: eventJson.quantityList.quantityElement[0].quantity,
  };

  if (eventJson.bizStep !== undefined) {
    quantityEvent = { ...quantityEvent, bizStep: eventJson.bizStep };
  }

  if (eventJson.disposition !== undefined) {
    quantityEvent = { ...quantityEvent, disposition: eventJson.disposition };
  }

  if (eventJson.readPoint !== undefined) {
    quantityEvent = {
      ...quantityEvent,
      readPoint: {
        id: eventJson.readPoint,
      },
    };
  }
  if (eventJson.bizLocation !== undefined) {
    quantityEvent = {
      ...quantityEvent,
      bizLocation: {
        id: eventJson.bizLocation,
      },
    };
  }

  if (eventJson.bizTransactions !== undefined) {
    quantityEvent = {
      ...quantityEvent,
      bizTransactionList: { bizTransaction: eventJson.bizTransactions },
    };
  }

  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        QuantityEvent: quantityEvent,
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};
