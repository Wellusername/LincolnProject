const xml2js = require("xml2js");

const epciEventDocument = {
  "xmlns:epcis": "urn:epcglobal:epcis:xsd:1",
  schemaVersion: "1.2",
  creationDate: new Date().toISOString(),
};

exports.convertToObjectEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });
  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        ObjectEvent: {
          eventTime: eventJson.eventTime,
          recordTime: eventJson.recordTime,
          eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
          ...eventJson.baseExtension,
          epcList: eventJson.epcList,
          action: eventJson.action,
          bizStep: eventJson.bizStep,
          disposition: eventJson.disposition,
          readPoint: {
            id: eventJson.readPoint,
          },
          bizLocation: {
            id: eventJson.bizLocation,
          },
          bizTransactionList: eventJson.bizTransactionList,
          extension: {
            quantityList: eventJson.quantityList,
            sourceList: eventJson.sourceList,
            destinationList: eventJson.destinationList,
          },
        },
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};

exports.convertToAggregationEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });
  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        AggregationEvent: {
          eventTime: eventJson.eventTime,
          recordTime: eventJson.recordTime,
          eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
          ...eventJson.baseExtension,
          parentID: eventJson.parentID,
          childEPCs: eventJson.childEPCs,
          action: eventJson.action,
          bizStep: eventJson.bizStep,
          disposition: eventJson.disposition,
          readPoint: {
            id: eventJson.readPoint,
          },
          bizLocation: {
            id: eventJson.bizLocation,
          },
          bizTransactionList: eventJson.bizTransactionList,
          extension: {
            childQuantityList: eventJson.childQuantityList,
            sourceList: eventJson.sourceList,
            destinationList: eventJson.destinationList,
          },
        },
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};

exports.convertToTransactionEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });
  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        TransactionEvent: {
          eventTime: eventJson.eventTime,
          recordTime: eventJson.recordTime,
          eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
          ...eventJson.baseExtension,
          bizTransactionList: eventJson.bizTransactionList,
          parentID: eventJson.parentID,
          epcList: eventJson.epcList,
          action: eventJson.action,
          bizStep: eventJson.bizStep,
          disposition: eventJson.disposition,
          readPoint: {
            id: eventJson.readPoint,
          },
          bizLocation: {
            id: eventJson.bizLocation,
          },
          extension: {
            quantityList: eventJson.quantityList,
            sourceList: eventJson.sourceList,
            destinationList: eventJson.destinationList,
          },
        },
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};

exports.convertToTransformEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });
  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        extension: {
          TransformationEvent: {
            eventTime: eventJson.eventTime,
            recordTime: eventJson.recordTime,
            eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
            ...eventJson.baseExtension,
            inputEPCList: eventJson.inputEPCList,
            inputQuantityList: eventJson.inputQuantityList,
            outputEPCList: eventJson.outputEPCList,
            outputQuantityList: eventJson.outputQuantityList,
            bizStep: eventJson.bizStep,
            disposition: eventJson.disposition,
            readPoint: {
              id: eventJson.readPoint,
            },
            bizLocation: {
              id: eventJson.bizLocation,
            },
            bizTransactionList: eventJson.bizTransactionList,
            transformationID: eventJson.transformationID,
          },
        },
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};

exports.convertToQuantityEventXml = (eventJson) => {
  const xmlBuilder = new xml2js.Builder({ rootName: "epcis:EPCISDocument" });
  const epcisDocument = {
    $: epciEventDocument,
    EPCISBody: {
      EventList: {
        QuantityEvent: {
          eventTime: eventJson.eventTime,
          recordTime: eventJson.recordTime,
          eventTimeZoneOffset: eventJson.eventTimeZoneOffset,
          ...eventJson.baseExtension,
          epcClass: eventJson.quantityList.quantityElement[0].epcClass,
          quantity: eventJson.quantityList.quantityElement[0].quantity,
          bizStep: eventJson.bizStep,
          disposition: eventJson.disposition,
          readPoint: {
            id: eventJson.readPoint,
          },
          bizLocation: {
            id: eventJson.bizLocation,
          },
          bizTransactionList: eventJson.bizTransactionList,
        },
      },
    },
  };

  return xmlBuilder.buildObject(epcisDocument);
};

const quantityEvent = {
  eventTime: "2022-01-01T00:00:00Z",
  recordTime: "2023-03-30T00:00:00.000+13:00",
  eventTimeZoneOffset: "-05:00",
  baseExtension: {
    baseExtension: {
      eventID: "eventJson.eventID",
    },
  },
  quantityList: {
    quantityElement: [
      { epcClass: "urn:epc:idpat:grai:195212.342345.*", quantity: "100" },
    ],
  },
  bizStep: "entering_selling_location",
  disposition: "urn:epcglobal:cbv:disp:in_progress",
  readPoint: "urn:epc:id:sgln:952987.698765.9529876987655",
  bizLocation: "urn:epc:id:sgln:952987.698765.9529876987655",
  bizTransactionList: {
    bizTransaction: [
      {
        _: "sfsd",
        $: {
          type: "fsfsd",
        },
      },
      {
        _: "s",
        $: {
          type: "fsfsd",
        },
      },
    ],
  },
};
