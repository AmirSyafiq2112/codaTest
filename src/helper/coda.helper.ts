import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

export const getRandomInt = () => {
  return Math.floor(Math.random() * 99999);

  /*  if we want min max the id value
  
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min); // The 
  */
};

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
  var stringifyHeaders = JSON.stringify(headers);
  var encodedHeader = base64url(stringifyHeaders);

  var stringifyPayload = JSON.stringify(payload);
  var encodedPayload = base64url(stringifyPayload);

  var token = encodedHeader + "." + encodedPayload;

  var signature = CryptoJS.HmacSHA256(token, secret);
  var stringifySignature = JSON.stringify(signature);
  var encodedSignature = base64url(stringifySignature);

  var signedToken = token + "." + encodedSignature;

  var bearerToken = "Bearer " + signedToken;

  // console.log(bearerToken);

  return bearerToken;
};
