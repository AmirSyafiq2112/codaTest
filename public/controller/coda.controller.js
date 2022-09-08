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
const codaLog_helper_1 = require("../helper/codaLog.helper");
const coda_helper_1 = require("../helper/coda.helper");
const coda_helper_2 = require("../helper/coda.helper");
const coda_models_1 = require("../models/coda.models");
// const sampleToken = process.env.SAMPLE_VOUCHER_TOKEN!;
// const url = process.env.CODA_PRODUCTION_URL;        /*for production*/
const url = process.env.CODA_VOUCHER_URL; /*for staging*/
const secret = process.env.CODA_SECRET_KEY;
const apiKey = process.env.CODA_API_KEY;
const clientId = process.env.CODA_CLIENT_ID;
//initialized variable globally, so all function can use it
var jsonPassed = {};
var newJson = {};
var header = {};
var productNameURL;
var jsonPassedMethod;
//updating the params sent from main Api differently by each methods requirements
const paramsSentToCoda = (methodSent, objSent) => {
    var jsonrpc = "2.0";
    var id = (0, coda_helper_2.getRandomInt)();
    var method = methodSent;
    var params = {};
    var methodToString = Object(method);
    console.log(`method: ${methodToString}`);
    let newParams = Object.assign({}, objSent, {
        iat: (0, coda_helper_2.getIAT)(),
    });
    params = newParams;
    createJson({ jsonrpc, id, method, params });
};
const createJson = (newJsonParams) => {
    newJson = newJsonParams;
};
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.body);
});
exports.test = test;
const productName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    productNameURL = req.params.productName;
    jsonPassed = req.body;
    jsonPassedMethod = req.body.method;
    var jsonPassedParams = req.body.params; /*params object from requested JSON from main Api*/
    //validate params sent using Joi Schema
    if (jsonPassedParams === "placeOrder") {
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
    //validate ends
    paramsSentToCoda(jsonPassedMethod, jsonPassedParams);
    // console.debug(jsonPassedMethod);               /*debug json passed from main Api*/
    // console.debug(newJson);                        /*debug updated json so it filled the requirement parameters for CODA*/
    res.send(newJson); /*console it to postman for validating the success of updated json, no further purposes */
    //Generate JWT for authorization header
    header = {
        alg: "HS256",
        typ: "JWT",
        "x-api-key": apiKey,
        "x-api-version": "2.0",
        "x-client-id": clientId,
    };
    var authorizationToken = yield (0, coda_helper_1.jwtGenerator)(header, newJson, secret);
    // console.debug(authorizationToken);                 /*debug JWT generated before send to CODA */
    (0, exports.codaVoucher)(newJson, authorizationToken);
});
exports.productName = productName;
//Send request to CODA Api using axios, parameter is url,payload and header
const codaVoucher = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    //HEADER for CODA
    var config = {
        headers: {
            "x-api-key": apiKey,
            "x-api-version": "2.0",
            authorization: token,
            "Content-Type": "application/json",
        },
    };
    // console.debug(config);
    axios_1.default
        .post(url + productNameURL, payload, config)
        .then((response) => {
        console.log("success");
        console.log(response.data);
    })
        .catch((error) => {
        //for logging error
        codaLog_helper_1.logger.error(error.response.status + " " + error.response.statusText, {
            method: jsonPassedMethod,
        });
    });
});
exports.codaVoucher = codaVoucher;
