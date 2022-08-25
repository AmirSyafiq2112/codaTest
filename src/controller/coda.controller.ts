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
import { logger } from "../helper/logger";
import winston from "winston";

const url = process.env.CODA_VOUCHER_URL!;
const sampleToken = process.env.SAMPLE_VOUCHER_TOKEN!;
const secret = process.env.CODA_SECRET_KEY!;

var authorizationToken: string;

const paramsSentToCoda = (methodSent: object, objSent: object) => {
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
		iat: getIAT(),
	});

	var params = newParams;

	return { jsonrpc, id, method, params };
};

var header: {} = {};
var jsonPassed: {} = {};
var newJson: {} = {};
var productNameURL: string;
var jsonPassedMethod: object;
var bearerToken: string;
var config: object = {};

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
		console.log("listsku here you f");
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
	authorizationToken = await jwtGenerator(header, newJson, secret);
	bearerToken = "Bearer " + authorizationToken;
	// console.log(bearerToken);
	codaVoucher(newJson, bearerToken);
};

export const codaVoucher = (params: object, token: string) => {
	config = {
		headers: {
			"x-api-key": process.env.CODA_API_KEY!,
			"x-api-version": "2.0",
			authorization: bearerToken,
			"Content-Type": "application/json",
		},
	};
	// console.debug(config);

	axios
		.post(url + productNameURL, params, config)
		.then((response) => {
			console.log("success");
			console.log(response.data);
			response.data;
		})
		.catch((error) => {
			console.log("error: ");
			// console.log(error.response);
			logger.error(error.response.data);
		});
};
