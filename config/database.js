const { createPool } = require("mysql2/promise");

const pool = createPool({
  host: "172.25.120.14",
  user: "desarrollo",
  password: "D3s4rrollo2023",
  port: 3306,
  database: "DESARROLLO",
});

module.exports = pool;
