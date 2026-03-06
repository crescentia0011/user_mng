// DAO : Database Access Object

// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, "dbConfig.env") });

const mysql = require("mysql2/promise");

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
  // debug: true,
});

module.exports = {
  pool: connectionPool,
};
