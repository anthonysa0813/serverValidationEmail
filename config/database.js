const { createPool } = require("mysql2/promise");

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "D3s4rrollo2023",
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
