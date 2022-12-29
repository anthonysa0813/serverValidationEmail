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

  await body.forEach(async (item) => {
    const result = await pool.query("INSERT INTO validador_correos SET ?", {
      lote: item.lote,
      correo: item.correo,
    });
  });

  return res.json({
    message: "POST request :d welcome",
    status: 201,
    body,
  });
};

module.exports = {
  getAllValidations,
  saveInformation,
};
