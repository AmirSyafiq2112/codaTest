"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.voucherSchema = joi_1.default.object({
    jsonrpc: joi_1.default.string(),
    id: joi_1.default.string().required(),
    method: joi_1.default.string().required(),
    params: joi_1.default.object({
        items: joi_1.default.object({
            sku: joi_1.default.string().required(),
            quantity: joi_1.default.number().default(1),
            price: joi_1.default.object({
                currency: joi_1.default.string(),
                amount: joi_1.default.number().required(),
            }),
        }).required(),
        customerId: joi_1.default.string().required(),
        iat: joi_1.default.number().required(),
    }),
});
