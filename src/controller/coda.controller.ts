import axios from "axios";
import { RequestHandler, response } from "express";
import { type } from "os";
import { voucherSchema } from "../models/coda.models";

var url = process.env.CODA_VOUCHER_URL!;

var voucher: {} = {};

var config = {
  headers: {
    "x-api-key": "7acAfMFrYl1mlmCvFDlEq8w9Rh8S6uyt8OmdtHFg",
    "x-api-version": "2.0",
    authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIngtYXBpLWtleSI6IjllekV2WTNVWnY3Mm91cWVMbnplTDQ0eWxyYlBkWjVDNlkzZTJjMUgiLCJ4LWFwaS12ZXJzaW9uIjoiMi4wIiwieC1jbGllbQtaWQiOiJ5b3VyQ2xpZW50SWRQcm92aWRlZEJ5Q29kYSJ9.eyJqc29ucnBjIjoiMi4wIiwiaWQiOiIxMjM0NSIsIm1ldGhvZCI6InBsYWNlT3JkZXIiLCJwYXJhbXMiOnsiaXRlbXMiOlt7InNrdSI6IlNBTVBMRS1TS1UtMFUzNkMiLCJxdWFudGl0eSI6Mn1dLCJjdXN0b21lcklkIjoiY3VzdG9tZXJzSWRIZXJlIiwiaWF0IjoxNTI0NTM1ODcxfX0.-xq9-FyTpVfbyMnJycJeQOXbHBB_WjiOoKHnmnLaZLo`,
    "Content-Type": "application/json",
  },
};

export const productName: RequestHandler = async (req, res) => {
  var { productName } = req.params;
  return res.json(productName);
};

export const coda: RequestHandler = async (req, res) => {
  if (req.body.method === "placeOrder") {
    voucher = {
      jsonrpc: "2.0",
      id: "12345",
      method: "placeOrder",
      params: {
        items: [
          {
            sku: "SAMPLE-SKU-0U36C",
            quantity: 1,
            price: {
              currency: "VND",
              amount: 10000,
            },
          },
        ],
        customerId: "customersIdHere",
        iat: 1524535871,
      },
    };
  }

  axios
    .post(url, voucher, config)
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(error.response.data);
        console.log(status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(error);
    });
};
