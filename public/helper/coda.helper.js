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
exports.jwtGenerator = exports.getIAT = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const getIAT = () => {
    return Math.floor(Date.now() / 1000) + 257;
};
exports.getIAT = getIAT;
const base64url = (source) => {
    // Encode in classical base64'
    var wordArraySource = crypto_js_1.default.enc.Utf8.parse(source);
    var encodedSource = crypto_js_1.default.enc.Base64.stringify(wordArraySource);
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, "");
    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, "-");
    encodedSource = encodedSource.replace(/\//g, "_");
    return encodedSource;
};
const jwtGenerator = (headers, payload, secret) => __awaiter(void 0, void 0, void 0, function* () {
    var stringifyHeaders = JSON.stringify(headers);
    var encodedHeader = base64url(stringifyHeaders);
    var stringifyPayload = JSON.stringify(payload);
    var encodedPayload = base64url(stringifyPayload);
    var token = encodedHeader + "." + encodedPayload;
    var signature = crypto_js_1.default.HmacSHA256(token, secret);
    var stringifySignature = JSON.stringify(signature);
    var encodedSignature = base64url(stringifySignature);
    var signedToken = token + "." + encodedSignature;
    var bearerToken = "Bearer " + signedToken;
    // console.log(bearerToken);
    return bearerToken;
});
exports.jwtGenerator = jwtGenerator;
