const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateEmailInput(data) {
  let errors = {};

  ["to", "subject", "text"].forEach(p => 
    data[p] = validText(data[p]) ? data[p] : ''
  )

  if (Validator.isEmpty(data.to)) {
    errors.to = "To field is required";
  }
  
  if (!Validator.isEmail(data.email)) {
    errors.to = "To field is invalid";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "Body is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
