const { Worker } = require("worker_threads");
const { request, response } = require("express");
const pool = require("../config/database");
const validateEmailFunction = require("../helpers/validateEmail");
const fetch = require("node-fetch");

const getAllValidations = async (req, res = response) => {
  const result = await pool.query("SELECT 2 + 2");

  res.json({
    message: "all ok",
  });
};

const saveInformation = async (req = request, res = response) => {
  const { params, query, body } = req;
  const { data, firstCol, secondCol } = body;
  let i = 0;
  const maxRequests = 10000;
  const delay = 800; // 2 seconds
  try {
    const makeRequest = async (correo, user) => {
      // Check if the maximum number of requests has been reached
      if (i >= maxRequests) {
        return res.json({
          message: "POST request",
          status: 201,
        });
        return;
      }

      try {
        const response = await fetch(
          `http://172.25.120.14/query_mail/index.php?mail=${correo}`
        );
        const dataRes = await response.text();
        await pool.query("INSERT INTO validador_correos SET ?", {
          lote: user.lote,
          correo: user.correo,
          estado: dataRes,
        });
      } catch (error) {
        console.log(error);
      }

      i++;

      // Wait for the delay before making the next request
      setTimeout(makeRequest, delay);
    };

    data.forEach(async (value) => {
      // console.log(value.correo);
      await makeRequest(value.correo, value);
    });
  } catch (error) {
    console.log("==============================");
    console.log("error", error);
    console.log("==============================");

    res.json({
      message: "POST request",
      status: 400,
    });
  }
};

module.exports = {
  getAllValidations,
  saveInformation,
};
