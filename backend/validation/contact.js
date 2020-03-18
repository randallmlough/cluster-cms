const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateContactInput(data) {
  let errors = {};

  ["name", "email"].forEach(p => 
    data[p] = validText(data[p]) ? data[p] : ''
  )

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
