const Joi = require("joi");

const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegexp =
  /^((\+)?(3)?(8)?[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{2}[- ]?\d{2}$/;

const contactSchema = Joi.object({
  name: Joi.string()
    .required()
    .pattern(nameRegexp)
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .pattern(phoneRegexp)
    .messages({ "any.required": "missing required phone field" }),
    favorite: Joi.bool()
  .default(false)
});

module.exports = contactSchema;
