const fetch = require("node-fetch");

const validateEmailFunction = async (correo = "") => {
  const res = await fetch(
    `http://172.25.120.14/query_mail/index.php?mail=${correo}`
  );
  const data = await res.text();
  return data;
};

module.exports = validateEmailFunction;
