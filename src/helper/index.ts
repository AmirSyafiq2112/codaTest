// import jwt from "jsonwebtoken";

export const getIAT = () => {
  return Math.floor(Date.now() / 1000) + 257;
};

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
