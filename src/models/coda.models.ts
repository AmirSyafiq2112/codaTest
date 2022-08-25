import Joi from "joi";
import { getIAT } from "../helper/coda.helper";

export const placeOrderParams = Joi.object({
  method: Joi.string().valid("placeOrder"),
  params: Joi.object({
    items: Joi.array()
      .items({
        sku: Joi.string().required(),
        quantity: Joi.number().default(1),
        price: Joi.object({
          currency: Joi.string(),
          amount: Joi.number().required(),
        }),
      })
      .required(),
  }),
});

export const getOrderParams = Joi.object({
  method: Joi.string().valid("getOrder"),
  params: Joi.object({
    orderId: Joi.string().required(),
  }),
});

export const listSkuParams = Joi.object({
  method: Joi.string().valid("listSku"),
  params: Joi.object({
    iat: Joi.number(),
  }),
});

export const validateParams = Joi.object({
  method: Joi.string().valid("validate"),
  params: Joi.object({
    items: Joi.array().items({
      sku: Joi.string(),
      quantity: Joi.number().default(1).required(),
      price: Joi.object({
        currency: Joi.string(),
        amount: Joi.number().required(),
      }),
    }),
  }),
});

export const topupParams = Joi.object({
  method: Joi.string().valid("topup"),
  params: Joi.object({
    orderId: Joi.string(),
    items: Joi.array().items({
      sku: Joi.string(),
      quantity: Joi.number().default(1),
      price: Joi.object({
        currency: Joi.string(),
        amount: Joi.number().required(),
      }),
    }),
  }),
});

export const listServerParams = Joi.object({
  method: Joi.string().valid("listServer"),
  params: Joi.object({
    iat: Joi.number(),
  }),
});
