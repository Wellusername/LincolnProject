exports.generateQRLink = async (req, res, next) => {
  const {
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
    res.status(200).json({
      success: true,
      data: "got it",
    });
  } catch (e) {
    next(e);
  }
};
