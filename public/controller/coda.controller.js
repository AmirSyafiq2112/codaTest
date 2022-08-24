"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codaVoucher = exports.productName = exports.test = void 0;
const axios_1 = __importDefault(require("axios"));
const coda_models_1 = require("../models/coda.models");
const index_1 = require("../helper/index");
var url = process.env.CODA_VOUCHER_URL;
var sampleToken = process.env.SAMPLE_VOUCHER_TOKEN;
const secret = process.env.CODA_SECRET_KEY;
// var authorizationToken: Promise<string>;
const paramsSentToCoda = (methodSent, objSent) => {
    var jsonrpc = "2.0";
    var id = "12345";
    var method = jsonPassedMethod;
    let newParams = Object.assign({}, objSent, {
        customerId: "customersIdHere",
        iat: 1524535871,
    });
    var params = newParams;
    return { jsonrpc, id, method, params };
};
var jsonPassed = {};
var newJson = {};
var productNameURL;
var jsonPassedMethod;
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.body);
});
exports.test = test;
const productName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    productNameURL = req.params.productName;
    jsonPassed = req.body;
    jsonPassedMethod = req.body.method;
    var jsonPassedParams = req.body.params; //params object from requested JSON
    if (req.body.method === "placeOrder") {
        console.log("here");
        const { error, value } = coda_models_1.placeOrderParams.validate(jsonPassed);
        if (error) {
            console.log(error.details[0].message);
            return res.send("invalid request");
        }
    }
    if (req.body.method === "getOrder") {
        const { error, value } = coda_models_1.getOrderParams.validate(jsonPassed);
        if (error) {
            console.log(error.details[0].message);
            return res.send("invalid request");
        }
    }
    if (req.body.method === "listSku") {
        const { error, value } = coda_models_1.listSkuParams.validate(jsonPassed);
        if (error) {
            console.log(error.details[0].message);
            return res.send("invalid request");
        }
    }
    if (req.body.method === "validate") {
        const { error, value } = coda_models_1.validateParams.validate(jsonPassed);
        if (error) {
            console.log(error.details[0].message);
            return res.send("invalid request");
        }
    }
    if (req.body.method === "topup") {
        const { error, value } = coda_models_1.topupParams.validate(jsonPassed);
        if (error) {
            console.log(error.details[0].message);
            return res.send("invalid request");
        }
    }
    if (req.body.method === "listServer") {
        const { error, value } = coda_models_1.listServerParams.validate(jsonPassed);
        if (error) {
            console.log(error.details[0].message);
            return res.send("invalid request");
        }
    }
    newJson = paramsSentToCoda(jsonPassedMethod, jsonPassedParams);
    console.log(jsonPassedMethod);
    console.log(newJson);
    res.send(newJson);
    (0, exports.codaVoucher)(newJson);
    console.log(authorizationToken);
});
exports.productName = productName;
var authorizationToken = (0, index_1.jwtGenerator)(config, newJson, secret);
console.log(authorizationToken);
var config = {
    headers: {
        "x-api-key": process.env.CODA_API_KEY,
        "x-api-version": "2.0",
        authorization: authorizationToken,
        "Content-Type": "application/json",
    },
};
const codaVoucher = (params) => {
    axios_1.default
        .post(url + productNameURL, params, config)
        .then((response) => {
        console.log("success");
        console.log(response.data);
    })
        .catch((error) => {
        console.log("error");
        // console.log(error.response.status + " " + error.response.statusText);
        // console.log(error);
    });
};
exports.codaVoucher = codaVoucher;
// export const coda: RequestHandler = async (req, res) => {
//   if (req.body.method === "placeOrder") {
//     voucher = {
//       jsonrpc: "2.0",
//       id: "12345",
//       method: "placeOrder",
//       params: {
//         items: [
//           {
//             sku: "SAMPLE-SKU-0U36C",
//             quantity: 1,
//             price: {
//               currency: "VND",
//               amount: 10000,
//             },
//           },
//         ],
//         customerId: "customersIdHere",
//         iat: 1524535871,
//       },
//     };
//   }
//   axios
//     .post(url, voucher, config)
//     .then((response) => {
//       console.log(response);
//       res.json(response);
//     })
//     .catch((error) => {
//       if (error.response) {
//         let { status, statusText } = error.response;
//         console.log(error.response.data);
//         console.log(status, statusText);
//         res.status(status).send(statusText);
//       } else res.status(404).send(error);
//     });
// };
