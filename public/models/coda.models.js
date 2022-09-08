"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listServerParams = exports.topupParams = exports.validateParams = exports.listSkuParams = exports.getOrderParams = exports.placeOrderParams = void 0;
const joi_1 = __importDefault(require("joi"));
exports.placeOrderParams = joi_1.default.object({
    method: joi_1.default.string().valid("placeOrder"),
    params: joi_1.default.object({
        items: joi_1.default.array()
            .items({
            sku: joi_1.default.string().required(),
            quantity: joi_1.default.number().default(1),
            price: joi_1.default.object({
                currency: joi_1.default.string(),
                amount: joi_1.default.number().required(),
            }),
        })
            .required(),
        customerId: joi_1.default.string().required(),
    }),
});
exports.getOrderParams = joi_1.default.object({
    method: joi_1.default.string().valid("getOrder"),
    params: joi_1.default.object({
        orderId: joi_1.default.string().required(),
    }),
});
exports.listSkuParams = joi_1.default.object({
    method: joi_1.default.string().valid("listSku"),
    params: joi_1.default.object({}),
});
exports.validateParams = joi_1.default.object({
    method: joi_1.default.string().valid("validate"),
    params: joi_1.default.object({
        items: joi_1.default.array().items({
            sku: joi_1.default.string(),
            quantity: joi_1.default.number().default(1).required(),
            price: joi_1.default.object({
                currency: joi_1.default.string(),
                amount: joi_1.default.number().required(),
            }),
        }),
        userAccount: joi_1.default.string().required(),
        customerId: joi_1.default.string().required(),
    }),
});
exports.topupParams = joi_1.default.object({
    method: joi_1.default.string().valid("topup"),
    params: joi_1.default.object({
        orderId: joi_1.default.string(),
        items: joi_1.default.array().items({
            sku: joi_1.default.string(),
            quantity: joi_1.default.number().default(1),
            price: joi_1.default.object({
                currency: joi_1.default.string(),
                amount: joi_1.default.number().required(),
            }),
        }),
    }),
    userAccount: joi_1.default.string().required(),
    customerId: joi_1.default.string().required(),
});
exports.listServerParams = joi_1.default.object({
    method: joi_1.default.string().valid("listServer"),
    params: joi_1.default.object({}),
});
