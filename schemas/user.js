const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  subscription: Joi.string().default("starter"),
  token: Joi.string().default(null),
});

module.exports = userSchema;
