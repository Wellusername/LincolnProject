const { s4tTerms } = require("../s4tTerms");

exports.mapTermToTermObject = (term) => {
  const item = s4tTerms.find((item, i) => {
    if (item.id === term) {
      return item;
    }
  });
  return item;
};
