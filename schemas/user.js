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
  avatarURL: Joi.string(),
  token: Joi.string().default(null),
  verified: Joi.bool().default(false),
  verificationToken: Joi.string().default(null),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Missing field 'subscription'",
    }),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
});

module.exports = { userSchema, subscriptionSchema, emailSchema };
