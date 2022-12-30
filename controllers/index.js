const { request, response } = require("express");
const pool = require("../config/database");

const getAllValidations = async (req, res = response) => {
  const result = await pool.query("SELECT 2 + 2");

  res.json({
    message: "all oki :D",
  });
};

const saveInformation = async (req = request, res = response) => {
  // const body = req.body;
  const { params, query, body } = req;
  const { data, firstCol, secondCol } = body;
  let errorStatus = false;
  await data.forEach(async (item) => {
    try {
      await pool.query("INSERT INTO validador_correos SET ?", {
        [firstCol]: item[firstCol],
        [secondCol]: item[secondCol],
      });
    } catch (error) {
      console.log("entro aqui");
      if (error) {
        errorStatus = true;
      }
    }
  });
  if (!errorStatus) {
    res.json({
      message: "POST request",
      status: 201,
    });
  } else {
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
