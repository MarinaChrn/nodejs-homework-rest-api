const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  subscription: Joi.string()
    .default("starter")
    .valid("starter", "pro", "business"),
  token: Joi.string().default(null),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Missing field 'subscription'",
    }),
});

module.exports = { userSchema, subscriptionSchema };
