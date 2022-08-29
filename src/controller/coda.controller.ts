import axios from "axios";
import { RequestHandler, response } from "express";

import { logger, requestLogger } from "../helper/codaLog.helper";
import { jwtGenerator } from "../helper/coda.helper";
import { getIAT } from "../helper/coda.helper";
import {
  placeOrderParams,
  getOrderParams,
  listSkuParams,
  validateParams,
  listServerParams,
  topupParams,
} from "../models/coda.models";

// const sampleToken = process.env.SAMPLE_VOUCHER_TOKEN!;
// const url = process.env.CODA_PRODUCTION_URL;        /*for production*/
const url = process.env.CODA_VOUCHER_URL!; /*for staging*/
const secret = process.env.CODA_SECRET_KEY!;
const apiKey = process.env.CODA_API_KEY!;
const clientId = process.env.CODA_CLIENT_ID!;

//initialized variable globally, so all function can use it
var jsonPassed: {} = {};
var newJson: {} = {};
var header: {} = {};
var productNameURL: string;
var jsonPassedMethod: object;

//updating the params sent from main Api differently by each methods requirements
const paramsSentToCoda = (methodSent: object, objSent: object) => {
  var jsonrpc = "2.0";
  var id = "customersIdHere";
  var method = methodSent;
  var params: {} = {};

  var methodToString = Object(method);

  if (methodToString == "placeOrder") {
    console.log(`method: ${methodToString}`);
    let newParams = Object.assign({}, objSent, {
      customerId: "1",
      iat: getIAT(),
    });

    params = newParams;

    createJson({ jsonrpc, id, method, params });
  } else if (methodToString == "getOrder") {
    console.log(`method: ${methodToString}`);
    let newParams = Object.assign({}, objSent, {
      orderId: "1",
      iat: getIAT(),
    });

    params = newParams;

    createJson({ jsonrpc, id, method, params });
  } else if (methodToString == "listSku") {
    console.log(`method: ${methodToString}`);
    let newParams = Object.assign({}, objSent, {
      iat: getIAT(),
    });

    params = newParams;

    createJson({ jsonrpc, id, method, params });
  } else if (methodToString == "listServer") {
    console.log(`method: ${methodToString}`);
    let newParams = Object.assign({}, objSent, {
      customerId: "1",
      iat: getIAT(),
    });

    params = newParams;

    createJson({ jsonrpc, id, method, params });
  } else if (methodToString == "validate") {
    console.log(`method: ${methodToString}`);
    let newParams = Object.assign({}, objSent, {
      userAccount: "userId_zoneId",
      customerId: "1",
      iat: getIAT(),
    });

    params = newParams;

    createJson({ jsonrpc, id, method, params });
  } else if (methodToString == "topup") {
    console.log(`method: ${methodToString}`);
    let newParams = Object.assign({}, objSent, {
      userAccount: "userId_zoneId",
      customerId: "1",
      iat: getIAT(),
    });

    params = newParams;

    createJson({ jsonrpc, id, method, params });
  }
};

const createJson = (newJsonParams: object) => {
  newJson = newJsonParams;
};

export const test: RequestHandler = async (req, res) => {
  res.json(req.body);
};

export const productName: RequestHandler = async (req, res) => {
  productNameURL = req.params.productName;
  jsonPassed = req.body;
  jsonPassedMethod = req.body.method;
  var jsonPassedParams =
    req.body.params; /*params object from requested JSON from main Api*/

  //validate params sent using Joi Schema
  if (jsonPassedParams === "placeOrder") {
    const { error, value } = placeOrderParams.validate(jsonPassed);
    if (error) {
      console.log(error.details[0].message);
      return res.send("invalid request");
    }
  }
  if (req.body.method === "getOrder") {
    const { error, value } = getOrderParams.validate(jsonPassed);
    if (error) {
      console.log(error.details[0].message);
      return res.send("invalid request");
    }
  }
  if (req.body.method === "listSku") {
    const { error, value } = listSkuParams.validate(jsonPassed);
    if (error) {
      console.log(error.details[0].message);
      return res.send("invalid request");
    }
  }
  if (req.body.method === "validate") {
    const { error, value } = validateParams.validate(jsonPassed);
    if (error) {
      console.log(error.details[0].message);
      return res.send("invalid request");
    }
  }
  if (req.body.method === "topup") {
    const { error, value } = topupParams.validate(jsonPassed);
    if (error) {
      console.log(error.details[0].message);
      return res.send("invalid request");
    }
  }
  if (req.body.method === "listServer") {
    const { error, value } = listServerParams.validate(jsonPassed);
    if (error) {
      console.log(error.details[0].message);
      return res.send("invalid request");
    }
  }
  //validate ends

  paramsSentToCoda(jsonPassedMethod, jsonPassedParams);
  // console.debug(jsonPassedMethod);               /*debug json passed from main Api*/
  // console.debug(newJson);                        /*debug updated json so it filled the requirement parameters for CODA*/
  res.send(
    newJson
  ); /*console it to postman for validating the success of updated json, no further purposes */

  //Generate JWT for authorization header
  header = {
    alg: "HS256",
    typ: "JWT",
    "x-api-key": apiKey,
    "x-api-version": "2.0",
    "x-client-id": clientId,
  };
  var authorizationToken = await jwtGenerator(header, newJson, secret);
  // console.debug(authorizationToken);                 /*debug JWT generated before send to CODA */
  codaVoucher(newJson, authorizationToken);
};

//Send request to CODA Api using axios, parameter is url,payload and header
export const codaVoucher = async (payload: object, token: string) => {
  //HEADER for CODA
  var config: any = {
    headers: {
      "x-api-key": apiKey,
      "x-api-version": "2.0",
      authorization: token,
      "Content-Type": "application/json",
    },
  };

  // console.debug(config);
  axios
    .post(url + productNameURL, payload, config)
    .then((response) => {
      console.log("success");
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.status + " " + error.response.statusText);
      console.log(error.response.data);

      //for logging error
      logger.error(error.response.status + " " + error.response.statusText);
      logger.error(error.response.data);
    });
};
