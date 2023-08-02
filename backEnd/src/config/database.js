const { Pool } = require("pg");

const pool = new Pool({
    host: "my-db-website-elearning.c2tgxqelqtys.ap-southeast-2.rds.amazonaws.com",
    user: "postgres",
    max: 20,
    port: 5433,
    password: "123456789abcABC",
    database: "inital_db",
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
pool.connect((err) => {
    if (err) {
        console.log("error: ", err.message);
        return;
    }
    console.log("database connected !");
});
module.exports = {
    pool,
};
