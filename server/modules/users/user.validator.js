import Joi from "joi";
// schema
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .required(),
  password: Joi.string().required(),
  roles: Joi.array().items(Joi.string().valid("admin", "user")),
  image: Joi.string(),
  isEmailVerified: Joi.boolean(),
  isActive: Joi.boolean(),
});

const validator = async (req, res, next) => {
  try {
    const { error, value } = await userSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default validator;
