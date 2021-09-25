const dateFormat = require("dateformat");

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function dateHelper(Handlebars, paramOne, paramTwo) {
  let value = new Date();
  var format = "d. m. yyyy";

  // first param are the options (no value)
  if (paramOne && paramOne.hash) {
    if (paramOne.hash.format) {
      format = paramOne.hash.format;
    }

    if (paramOne.hash.date) {
      value = new Date(paramOne.hash.date);
    }
  } else {
    value = new Date(paramOne);
    value = isValidDate(value) ? value : new Date();
    if (paramTwo && paramTwo.hash && paramTwo.hash.format) {
      format = paramTwo.hash.format;
    }
  }

  return new Handlebars.SafeString(dateFormat(value, format));
}

const helpers = [{ name: "date", hanlder: dateHelper }];

exports.helpers = helpers;
