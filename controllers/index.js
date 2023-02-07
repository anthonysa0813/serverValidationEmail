const { Worker } = require("worker_threads");
const { request, response } = require("express");
const pool = require("../config/database");
const validateEmailFunction = require("../helpers/validateEmail");
const fetch = require("node-fetch");
const { saveInformationDatabase } = require("../helpers/saveInformation");

const getAllValidations = async (req, res = response) => {
  const result = await pool.query("SELECT 2 + 2");

  res.json({
    message: "all ok",
  });
};

const saveInformatio4 = async (req = request, res = response) => {
  const { body } = req;
  const { data: dataArr } = body;
  const delay = 200; // 0.2 seconds
  try {
    const requests = dataArr.map((item, index) => {
      return new Promise((resolve) =>
        setTimeout(async () => {
          try {
            const connection = await pool.getConnection();
            await connection.beginTransaction();
            const response = await fetch(
              `http://172.25.120.14/query_mail/index.php?mail=${item.correo}`
            );
            const dataRes = await response.text();
            console.log({
              lote: item.lote,
              correo: item.correo,
              estado: dataRes,
            });

            resolve({
              lote: item.lote,
              correo: item.correo,
              estado: dataRes,
            });
          } catch (error) {
            console.error(error);
            resolve(error);
          }
        }, index * delay)
      );
    });
    // const results = await Promise.all(requests);
    // console.log("results: " + results);
    // await results.forEach(async (value, i) => {});
  } catch (error) {
    console.log("==============================");
    console.log("error", error);
    console.log("==============================");

    res.status(200).json({
      message: "POST request",
      status: 400,
    });
  }
};

const saveInformation = async (req, res) => {
  const { body } = req;
  const { data: dataArr } = body;
  const delay = 100; // 0.2 seconds
  const requests = [];
  try {
    for (let index = 0; index < dataArr.length; index++) {
      requests.push(
        new Promise((resolve) =>
          setTimeout(async () => {
            try {
              const response = await fetch(
                `http://172.25.120.14/query_mail/index.php?mail=${dataArr[index].correo}`
              );
              const dataRes = await response.text();
              resolve({
                lote: dataArr[index].lote,
                correo: dataArr[index].correo,
                estado: dataRes,
              });
            } catch (error) {
              console.error(error);
              resolve(error);
            }
          }, index * delay)
        )
      );
    }
  } catch (error) {
    console.log("==============================");
    console.log("error", error);
    console.log("==============================");

    res.status(200).json({
      message: "POST request",
      status: 400,
    });
  }

  const promisesRequest = await Promise.all(requests);
  promisesRequest.forEach(async (value) => {
    // const connection = await pool.getConnection();
    // await connection.beginTransaction();
    try {
      // Begin transaction
      // Check if email already exists
      const [rows] = await pool.query(
        "SELECT 1 FROM validador_correos WHERE correo = ?",
        [value.correo]
      );
      console.log("rows", rows);
      if (rows.length) {
        throw new Error("Email already exists");
      }

      // Insert data
      await pool.query("INSERT INTO validador_correos SET ?", {
        lote: value.lote,
        correo: value.correo,
        estado: value.estado,
      });
      console.log("email created successfully");
    } catch (error) {
      // Rollback transaction
      // await connection.rollback();
      // connection.release();
      console.log(error);
    }
  });
};

module.exports = {
  getAllValidations,
  saveInformation,
};
