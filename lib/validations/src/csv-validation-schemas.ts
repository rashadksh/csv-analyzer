import * as Joi from 'joi';

export const askCSVFileValidationSchema = Joi.object()
  .keys({
    question: Joi.string().min(5).max(1024).required(),
  })
  .required();
