import Joi from "joi";

const movieSchema = Joi.object({
  title: Joi.string().required(),
  duration: Joi.string().required(),
  synopsis: Joi.string(),
  poster: Joi.string().required(),
  releasedDate: Joi.date().required(),
  endDate: Joi.date().required(),
  seats: Joi.number().required(),
});

const validator = async (req, res, next) => {
  try {
    console.log(req.body);
    const { error, value } = await movieSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default validator;
