const { parentPort } = require("worker_threads");
const {
  validateEmailFunction,
  validateEmailFunctionAxios,
} = require("./helpers/validateEmail");
const pool = require("./config/database");

parentPort.on("message", (data) => {
  // console.log("data", data);
  if (data.length > 0) {
    try {
      const newData = data.map(async (value, i) => {
        return await validateEmailFunction(value.correo, value);
      });
      console.log("nw d", newData);
    } catch (error) {
      console.log(error);
    }
  }
});
