const { default: axios } = require("axios");
const fetch = require("node-fetch");
const pool = require("../config/database");

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 500 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

const validateEmailFunction = async (correo = "", dataUser) => {
  try {
    const controller = new AbortController();
    // const timeoutId = setTimeout(() => controller.abort(), 200);
    const res = await fetchWithTimeout(
      `http://172.25.120.14/query_mail/index.php?mail=${correo}`,
      { timeout: 6000 }
    );
    // clearTimeout(timeoutId);

    // const data = await res.text();

    // await pool.query("INSERT INTO validador_correos SET ?", {
    //   lote: dataUser.lote,
    //   correo: dataUser.correo,
    //   estado: data,
    // });
    // return data;
  } catch (error) {
    console.error(`Download error: ${error.message}`);
  }
};

const validateEmailFunctionAxios = async (correo = "") => {
  const res = await axios.get(
    `http://172.25.120.14/query_mail/index.php?mail=${correo}`
  );
  return res.data;
};

module.exports = { validateEmailFunction, validateEmailFunctionAxios };
