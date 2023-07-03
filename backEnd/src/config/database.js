const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    max: 20,
    port: 5433,
    password: "password",
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
module.exports = {
    pool,
};
