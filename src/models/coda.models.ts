import Joi from "joi";

export interface voucherSchema { 
     voucherParams = Joi.object({
      jsonrpc: Joi.string(),
      id: Joi.string().required(),
      method: Joi.string().required(),
      params: Joi.object({
        items: Joi.object({
          sku: Joi.string().required(),
          quantity: Joi.number().default(1),
          price: Joi.object({
            currency: Joi.string(),
            amount: Joi.number().required(),
          }),
        }).required(),
        customerId: Joi.string().required(),
        iat: Joi.number().required(),
      }),
    });

}
