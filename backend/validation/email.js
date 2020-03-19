const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateEmailInput(data) {
  let errors = {};

  ["to", "subject", "body"].forEach(p => 
    data[p] = validText(data[p]) ? data[p] : ''
  )

  if (Validator.isEmpty(data.to)) {
    errors.to = "To field is required";
  }
  
  if (!Validator.isEmail(data.to)) {
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
