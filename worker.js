const { parentPort } = require("worker_threads");
const pool = require("./config/database");

parentPort.on("message", (data) => {
  if (data.length > 0) {
    try {
      data.forEach(async (value) => {
        await pool.query("INSERT INTO validador_correos SET ?", {
          lote: value.lote,
          correo: value.correo,
          estado: value.estado,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
});

// module.exports = { saveWorker };
