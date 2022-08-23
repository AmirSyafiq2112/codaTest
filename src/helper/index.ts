import jwt from "jsonwebtoken";

export const getIAT = () => {
  return Math.floor(Date.now() / 1000) + 257;
};

export const jwtGenerator = async (headers, payload, secret) => {
  var encodedHeader = jwt.sign(headers);
};
