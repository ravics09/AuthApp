import Joi from "joi";

export const authSchema = {
  signup: {
    body: Joi.object({
      username: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    })
  },

  signin: {
    body: Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    })
  }
};
