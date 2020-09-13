require('dotenv').config()

module.exports = {
  host: process.env.HOST || "127.0.0.1",
  user: process.env.DATABASE_USER || "root",
  database: process.env.DATABASE_DB || "test_db",
  password: process.env.DATABASE_PASSWORD || "root",
  insecureAuth : true
};
