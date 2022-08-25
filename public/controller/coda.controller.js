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
const index_2 = require("../helper/index");
const logger_1 = require("../helper/logger");
const url = process.env.CODA_VOUCHER_URL;
const sampleToken = process.env.SAMPLE_VOUCHER_TOKEN;
const secret = process.env.CODA_SECRET_KEY;
var authorizationToken;
const paramsSentToCoda = (methodSent, objSent) => {
    var jsonrpc = "2.0";
    var id = "12345";
    var method = methodSent;
    var stringMethod = JSON.stringify(method);
    var newParams;
    // if (stringMethod == "placeOrder") {
    // 	//do somthing
    // 	console.log("here");
    // }
    newParams = Object.assign({}, objSent, {
        customerId: "12345",
        iat: (0, index_2.getIAT)(),
    });
    var params = newParams;
    return { jsonrpc, id, method, params };
};
var header = {};
var jsonPassed = {};
var newJson = {};
var productNameURL;
var jsonPassedMethod;
var bearerToken;
var config = {};
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
        console.log("listsku here you f");
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
    header = {
        alg: "HS256",
        typ: "JWT",
        "x-api-key": process.env.CODA_API_KEY,
        "x-api-version": "2.0",
        "x-client-id": process.env.CODA_CLIENT_ID,
    };
    newJson = paramsSentToCoda(jsonPassedMethod, jsonPassedParams);
    console.log(newJson);
    res.send(newJson);
    authorizationToken = yield (0, index_1.jwtGenerator)(header, newJson, secret);
    bearerToken = "Bearer " + authorizationToken;
    // console.log(bearerToken);
    (0, exports.codaVoucher)(newJson, bearerToken);
});
exports.productName = productName;
const codaVoucher = (params, token) => {
    config = {
        headers: {
            "x-api-key": process.env.CODA_API_KEY,
            "x-api-version": "2.0",
            authorization: bearerToken,
            "Content-Type": "application/json",
        },
    };
    // console.debug(config);
    axios_1.default
        .post(url + productNameURL, params, config)
        .then((response) => {
        console.log("success");
        console.log(response.data);
        response.data;
    })
        .catch((error) => {
        console.log("error: ");
        // console.log(error.response);
        logger_1.logger.error(error.response.data);
    });
};
exports.codaVoucher = codaVoucher;
