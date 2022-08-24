"use strict";
// import jwt from "jsonwebtoken";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIAT = void 0;
const getIAT = () => {
    return Math.floor(Date.now() / 1000) + 257;
};
exports.getIAT = getIAT;
// export const jwtGenerator = async (headers, payload, secret) => {
//   var token = jwt.sign(
//     { payload: payload },
//     secret,
//     { algorithm: "RS256" },
//     (err, token) => {
//       console.log(token);
//     }
//   );
// };
