import axios from "axios";
import { RequestHandler, response } from "express";
import {
  placeOrderParams,
  getOrderParams,
  listSkuParams,
  validateParams,
  listServerParams,
  topupParams,
} from "../models/coda.models";

import { jwtGenerator } from "../helper/index";

import { getIAT } from "../helper/index";

var url = process.env.CODA_VOUCHER_URL!;
var sampleToken = process.env.SAMPLE_VOUCHER_TOKEN!;
const secret = process.env.CODA_SECRET_KEY!;

// var authorizationToken: Promise<string>;

const paramsSentToCoda = (methodSent: object, objSent: object) => {
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

var jsonPassed: {} = {};
var newJson: {} = {};
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

  if (req.body.method === "placeOrder") {
    console.log("here");
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
  console.log(jsonPassedMethod);
  console.log(newJson);
  res.send(newJson);
  codaVoucher(newJson);
  console.log(authorizationToken);
};

var authorizationToken = jwtGenerator(config, newJson, secret);
console.log(authorizationToken);

var config: any = {
  headers: {
    "x-api-key": process.env.CODA_API_KEY!,
    "x-api-version": "2.0",
    authorization: authorizationToken,
    "Content-Type": "application/json",
  },
};

export const codaVoucher = (params: object) => {
  axios
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
