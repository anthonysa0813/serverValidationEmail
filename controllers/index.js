const { request, response } = require("express");
const pool = require("../config/database");
const validateEmailFunction = require("../helpers/validateEmail");

const getAllValidations = async (req, res = response) => {
  const result = await pool.query("SELECT 2 + 2");

  res.json({
    message: "all ok",
  });
};

const saveInformation = async (req = request, res = response) => {
  // const body = req.body;
  const { params, query, body } = req;
  const { data, firstCol, secondCol } = body;

  try {
    const newData = data.map(async (d) => {
      const isValid = await validateEmailFunction(d.correo);
      return {
        correo: d.correo,
        lote: d.lote,
        estado: isValid,
      };
    });
    await Promise.all(newData).then((values) => {
      values.forEach(async (value) => {
        await pool.query("INSERT INTO validador_correos SET ?", {
          [firstCol]: value.lote,
          [secondCol]: value.correo,
          estado: value.estado,
        });
      });
    });
    return res.json({
      message: "POST request",
      status: 201,
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
