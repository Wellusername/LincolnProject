export var s4tTerms = [
  {
    id: "sscc",
    code: "00",
    label: "SSCC",
    grouping: "PrimaryIdentifiers",
    datatype: "xsd:string",
    definition: "Serial Shipping Container Code (SSCC)",
    example: "195212342345678909",
    percentEncoded: false,
    pattern: "[0-9]{18}",
  },
  {
    id: "logisticWeight",
    code: "330n",
    label: "Logistic Weight (kg)",
    grouping: "Measurements",
    datatype: "gs1:Measurement",
    definition: "Logistic weight (kg)",
    example: "13.542",
    unit: "kg",
    percentEncoded: false,
  },
  {
    id: "lengthOfFirstDimension",
    code: "331n",
    label: "Length of first dimension (m)",
    grouping: "Measurements",
    datatype: "gs1:Measurement",
    definition: "Length of first dimension (m)",
    example: "0.75",
    unit: "m",
    percentEncoded: false,
  },
  {
    id: "widthOfSecondDimension",
    code: "332n",
    label: "Width of second dimension (m)",
    grouping: "Measurements",
    datatype: "gs1:Measurement",
    definition: "Width of second dimension (m)",
    example: "0.55",
    unit: "m",
    percentEncoded: false,
  },
  {
    id: "depthThicknessHeight",
    code: "333n",
    label: "Depth, thickness, height (m)",
    grouping: "Measurements",
    datatype: "gs1:Measurement",
    definition: "Depth, thickness, height or third dimension (m)",
    example: "0.35",
    unit: "m",
    percentEncoded: false,
  },
  {
    id: "logisticVolume",
    code: "336n",
    label: "Logistic volume (cubic metres)",
    grouping: "Measurements",
    datatype: "gs1:Measurement",
    definition: "Logistic volume (cubic metres)",
    example: "0.085",
    unit: "m^3",
    percentEncoded: false,
  },
  {
    id: "shipToCompany",
    code: "4300",
    label: "Ship-to / Deliver-to company",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition: "Name of the company and/or per receiving the freight unit",
    example: "Café Niçoise at GS1 AISBL",
    percentEncoded: true,
  },
  {
    id: "shipToContact",
    code: "4301",
    label: "Ship-to / Deliver-to contact",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition: "Name of the company and/or per receiving the freight unit",
    example: "Jaco Voorspuij",
    percentEncoded: true,
  },
  {
    id: "shipToAddressLine1",
    code: "4302",
    label: "Ship-to / Deliver-to address line 1",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition: "Receiving company/residential street address (Line 1)",
    example: "Avenue Louise 326",
    percentEncoded: true,
  },
  {
    id: "shipToAddressLine2",
    code: "4303",
    label: "Ship-to / Deliver-to address line 2",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition: "Receiving company/residential street address (Line 2)",
    example: "Blue Tower",
    percentEncoded: true,
  },
  {
    id: "shipToSuburb",
    code: "4304",
    label: "Ship-to / Deliver-to suburb",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition: "Receiving company/residential Suburb",
    example: "Ixelles",
    percentEncoded: true,
  },
  {
    id: "shipToLocality",
    code: "4305",
    label: "Ship-to / Deliver-to locality (town/city)",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition: "Receiving company/residential Locality (town/city)",
    example: "Bruxelles",
    percentEncoded: true,
  },
  {
    id: "shipToRegion",
    code: "4306",
    label: "Ship-to / Deliver-to region (state/county)",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition: "Receiving company Region (state/county)",
    example: "Brussels-Capital Region",
    percentEncoded: true,
  },
  {
    id: "shipToCountryCode",
    code: "4307",
    label: "Ship-to / Deliver-to country code",
    grouping: "ShippingAddressInformation",
    datatype: "gs1:CountryCode",
    definition: "Receiving company/residential Country",
    example: "BE",
    percentEncoded: false,
  },
  {
    id: "shipToPostalCode",
    code: "420",
    label: "Ship-to / Deliver-to postal code",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition: "Receiving company/residential Postcode",
    example: "1050",
    percentEncoded: false,
  },
  {
    id: "shipToPhoneNumber",
    code: "4308",
    label: "Ship-to / Deliver-to phone number",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition:
      "Contact phone number for the receiver of the freight unit. Used to populate the system when no EDI has been received",
    example: "+32 2 788 78 00",
    percentEncoded: false,
  },
  {
    id: "shipToGeocode",
    code: "4309",
    label: "Ship-to / Deliver-to geocode",
    grouping: "ShippingAddressInformation",
    datatype: "xsd:string",
    definition:
      "20-digit geocode representing WGS84 latitude,/longitude for ship-to/deliver-to location",
    example: "14220219500001282028",
    percentEncoded: false,
    geocode: true,
  },
  {
    id: "returnToCompany",
    code: "4310",
    label: "Return-to company name",
    grouping: "ReturnAddressInformation",
    datatype: "xsd:string",
    definition: "Company name for the return to address",
    example: "GS1 Global Office",
    percentEncoded: true,
  },
  {
    id: "returnToContact",
    code: "4311",
    label: "Return-to contact",
    grouping: "ReturnAddressInformation",
    datatype: "xsd:string",
    definition: "Name of the contact freight unit is to be returned to",
    example: "Dan Mullen",
    percentEncoded: true,
  },
  {
    id: "returnToAddressLine1",
    code: "4312",
    label: "Return-to address line 1",
    grouping: "ReturnAddressInformation",
    datatype: "xsd:string",
    definition: "Return to company/residential street address (Line 1)",
    example: "300 Charles Ewing Boulevard",
    percentEncoded: true,
  },
  {
    id: "returnToAddressLine2",
    code: "4313",
    label: "Return-to address line 2",
    grouping: "ReturnAddressInformation",
    datatype: "xsd:string",
    definition: "Return to company/residential street address (Line 2)",
    example: "Ground Floor Suite",
    percentEncoded: true,
  },
  {
    id: "returnToSuburb",
    code: "4314",
    label: "Return-to suburb",
    grouping: "ReturnAddressInformation",
    datatype: "xsd:string",
    definition: "Return to company/residential Suburb",
    example: "Ewingville",
    percentEncoded: true,
  },
  {
    id: "returnToLocality",
    code: "4315",
    label: "Return-to locality (town/city)",
    grouping: "ReturnAddressInformation",
    datatype: "xsd:string",
    definition: "Return to company/residential Locality (town/city)",
    example: "Ewing",
    percentEncoded: true,
  },
  {
    id: "returnToRegion",
    code: "4316",
    label: "Return-to region (state/county)",
    grouping: "ReturnAddressInformation",
    datatype: "xsd:string",
    definition: "Return to company/residential Region (state/county)",
    example: "New Jersey",
    percentEncoded: true,
  },
  {
    id: "returnToCountryCode",
    code: "4317",
    label: "Return-to country code",
    grouping: "ReturnAddressInformation",
    datatype: "gs1:CountryCode",
    definition: "Return to company/residential Country",
    example: "US",
    percentEncoded: false,
  },
  {
    id: "returnToPostalCode",
    code: "4318",
    label: "Return-to postal code",
    grouping: "ReturnAddressInformation",
    datatype: "xsd:string",
    definition: "Return to company/residential Postcode",
    example: "08628",
    percentEncoded: false,
  },
  {
    id: "returnToPhoneNumber",
    code: "4319",
    label: "Return-to phone number",
    grouping: "ReturnAddressInformation",
    datatype: "xsd:string",
    definition:
      "Contact phone number for the receiver of the freight unit. Used to populate the system when no EDI has been received",
    example: "+32 2 788 78 00",
    percentEncoded: false,
  },
  {
    id: "serviceCodedescription",
    code: "4320",
    label: "Service code description",
    grouping: "TransportTaskInformation",
    datatype: "xsd:string",
    definition:
      "Freight service code specifies if it is a standard, express, overnight, same day service, etc.  This will be unique to the shipper.",
    example: "express",
    percentEncoded: true,
  },
  {
    id: "dangerousGoodsFlag",
    code: "4321",
    label: "Dangerous goods flag",
    grouping: "FreightUnitInformation",
    datatype: "xsd:boolean",
    definition:
      "A flag to indicate if the freight unit contains Dangerous Goods",
    example: "0",
    percentEncoded: false,
  },
  {
    id: "authorityToLeave",
    code: "4322",
    label: "Authority to leave",
    grouping: "DeliveryInstructions",
    datatype: "xsd:boolean",
    definition:
      "This indicates to the operator that he/she may leave the transport unit at the destination location. Implies the operator does not need to hand the transport unit over to a person. Also implies no signature from recipient is required.",
    example: "0",
    percentEncoded: false,
  },
  {
    id: "signitureRequire",
    code: "4323",
    label: "Signature required flag",
    grouping: "DeliveryInstructions",
    datatype: "xsd:boolean",
    definition:
      "This indicates to the operator that the operator must get a signature from the recipient for having delivered the transport unit to the intended destination. This implies that delivery must be made to a person.",
    example: "1",
    percentEncoded: false,
  },
  {
    id: "notBeforeDeliveryDateTime",
    code: "4324",
    label: "Not before delivery date time",
    grouping: "DeliveryInstructions",
    datatype: "xsd:dateTime",
    definition:
      "In transportation, it is a common business requirement to not deliver before a set date.",
    example: "2020-01-18T00:00",
    percentEncoded: false,
  },
  {
    id: "notAfterDeliveryDateTime",
    code: "4325",
    label: "Not after delivery date time",
    grouping: "DeliveryInstructions",
    datatype: "xsd:dateTime",
    definition:
      "In transportation, it is a common business requirement to deliver before a set date.",
    example: "2020-01-25T00:00",
    percentEncoded: false,
  },
  {
    id: "releaseDate",
    code: "4326",
    label: "Release date",
    grouping: "DeliveryInstructions",
    datatype: "xsd:date",
    definition:
      "Sometimes transport service providers are required to 'hold' transport units for a while before these transport units are allowed to be sent out to recipients.",
    example: "2020-01-15",
    percentEncoded: false,
  },
  {
    id: "ginc",
    code: "401",
    label: "GINC",
    grouping: "OtherIdentifiers",
    datatype: "xsd:string",
    definition: "Global Identification Number for Consignment (GINC)",
    example: "9521234ABC12345",
    percentEncoded: false,
  },
  {
    id: "gsin",
    code: "402",
    label: "GSIN",
    grouping: "OtherIdentifiers",
    datatype: "xsd:string",
    definition: "Global Shipment Identification Number (GSIN)",
    example: "95212340000000012",
    percentEncoded: false,
  },
  {
    id: "grai",
    code: "8003",
    label: "GRAI",
    grouping: "OtherIdentifiers",
    datatype: "xsd:string",
    definition: "Global Returnable Asset Identifier (GRAI)",
    example: "095211411234545678",
    percentEncoded: false,
    pattern:
      "(d{14})([\x21-\x22\x25-\x2F\x30-\x39\x3A-\x3F\x41-\x5A\x5F\x61-\x7A]{0,16})",
  },
  {
    id: "routingCode",
    code: "403",
    label: "Routing code",
    grouping: "OtherIdentifiers",
    datatype: "xsd:string",
    definition: "Routing Code: AI(403)",
    example: "DEF19485",
    percentEncoded: false,
  },
  {
    id: "shipToGln",
    code: "410",
    label: "Ship-to / Deliver-to GLN",
    grouping: "OtherIdentifiers",
    datatype: "xsd:string",
    definition: "Ship-to / Deliver-to GLN",
    example: "9529876987655",
    percentEncoded: false,
  },
  {
    id: "shipForGln",
    code: "413",
    label: "Ship-for / Deliver-for GLN",
    grouping: "OtherIdentifiers",
    datatype: "xsd:string",
    definition: "Ship-for / Deliver-for GLN",
    example: "9529876567895",
    percentEncoded: false,
  },
];
