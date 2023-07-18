import Joi from 'joi';

export const productSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  is_giftcard: Joi.boolean().required(),
  status: Joi.string().required(),
  discountable: Joi.boolean().required(),
  profile_id: Joi.string().required(),
  batch_no: Joi.string(),
});
