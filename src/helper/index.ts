import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { any, string } from "joi";
// import postman from 'postman'

export const getIAT = () => {
	return Math.floor(Date.now() / 1000) + 257;
};

const base64url = (source: string) => {
	// Encode in classical base64'
	var wordArraySource = CryptoJS.enc.Utf8.parse(source);
	var encodedSource = CryptoJS.enc.Base64.stringify(wordArraySource);
	// Remove padding equal characters
	encodedSource = encodedSource.replace(/=+$/, "");
	// Replace characters according to base64url specifications
	encodedSource = encodedSource.replace(/\+/g, "-");
	encodedSource = encodedSource.replace(/\//g, "_");
	return encodedSource;
};

export const jwtGenerator = async (
	headers: object,
	payload: object,
	secret: string
) => {
	// var varObj = postman.globals.toObject()

	var stringifyHeaders = JSON.stringify(headers);
	var encodedHeader = base64url(stringifyHeaders);

	var stringifyPayload = JSON.stringify(payload);
	var encodedPayload = base64url(stringifyPayload);

	var token = encodedHeader + "." + encodedPayload;

	var signature = CryptoJS.HmacSHA256(token, secret);
	// console.log("secret :" + secret);
	var stringifySignature = JSON.stringify(signature);
	var encodedSignature = base64url(stringifySignature);

	var signedToken = token + "." + encodedSignature;

	// console.log(signedToken);

	return signedToken;
};
