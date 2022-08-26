import axios from "axios";
import { RequestHandler, response } from "express";
import { logger, requestLogger } from "../helper/codaLog.helper";
import {
  placeOrderParams,
  getOrderParams,
  listSkuParams,
  validateParams,
  listServerParams,
  topupParams,
} from "../models/coda.models";

import { jwtGenerator } from "../helper/coda.helper";

import { getIAT } from "../helper/coda.helper";
import { object } from "joi";

const url = process.env.CODA_VOUCHER_URL!;
// const url = "https://xshop.codashop.com/";
const sampleToken = process.env.SAMPLE_VOUCHER_TOKEN!;
const secret = process.env.CODA_SECRET_KEY!;
const apiKey = process.env.CODA_API_KEY!;
const clientId = process.env.CODA_CLIENT_ID!;

// var authorizationToken: Promise<string>;

const paramsSentToCoda = (methodSent: object, objSent: object) => {
  var jsonrpc = "2.0";
  var id = "customersIdHere";
  var method = jsonPassedMethod;

  let newParams = Object.assign({}, objSent, {
    customerId: "1",
    iat: getIAT(),
  });

  var params = newParams;

  return { jsonrpc, id, method, params };
};

var jsonPassed: {} = {};
var newJson: {} = {};
var header: {} = {};
var productNameURL: string;
var jsonPassedMethod: object;

export const test: RequestHandler = async (req, res) => {
  res.json(req.body);
};

export const productName: RequestHandler = async (req, res) => {
  productNameURL = req.params.productName;
  jsonPassed = req.body;
  jsonPassedMethod = req.body.method;
  var jsonPassedParams = req.body.params; //params object from requested JSON

  header = {
    alg: "HS256",
    typ: "JWT",
    "x-api-key": apiKey,
    "x-api-version": "2.0",
    "x-client-id": clientId,
  };

  if (req.body.method === "placeOrder") {
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

  newJson = paramsSentToCoda(jsonPassedMethod, jsonPassedParams);
  // console.log(jsonPassedMethod);
  // console.log(newJson);
  res.send(newJson);
  var authorizationToken = await jwtGenerator(header, newJson, secret);
  // var bearerToken = "Bearer " + authorizationToken;
  // console.log(authorizationToken);
  codaVoucher(newJson, authorizationToken);
};

export const codaVoucher = async (payload: object, token: string) => {
  var config: any = {
    headers: {
      "x-api-key": apiKey,
      "x-api-version": "2.0",
      authorization: token,
      "Content-Type": "application/json",
    },
  };

  var headerForAxios = { ...config };
  console.debug(config);
  axios
    .post(url + productNameURL, payload, config)
    .then((response) => {
      console.log("success");
      console.log(response.data);
    })
    .catch((error) => {
      console.log("error");
      // console.log(error.response);
      console.log(error.response.status + " " + error.response.statusText);
      console.log(error.response);
      logger.error(error.response.data);
    });
};
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
