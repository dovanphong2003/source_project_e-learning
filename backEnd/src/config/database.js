const { Pool } = require("pg");
require("dotenv").config(); // Đảm bảo đã cài đặt gói dotenv và gọi config().

const pool = new Pool({
    host: process.env.LOCALHOST_CONNECT_DATABASE,
    user: "postgres", // Thay đổi nếu bạn sử dụng tên người dùng khác.
    max: 20,
    port: 5433, // Sử dụng giá trị từ biến môi trường.
    password: process.env.DATABASE_PASSWORD, // Sử dụng giá trị từ biến môi trường.
    database: process.env.DATABASE_NAME, // Sử dụng giá trị từ biến môi trường.
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 4000,
    ssl: {
        rejectUnauthorized: false,
    },
});
// const pool = new Pool({
//     host: "localhost",
//     user: "postgres", // Thay đổi nếu bạn sử dụng tên người dùng khác.
//     max: 20,
//     port: 5433, // Sử dụng giá trị từ biến môi trường.
//     password: "password", // Sử dụng giá trị từ biến môi trường.
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 4000,
// });

pool.connect(async (err) => {
    if (err) {
        // console.error("Error connecting to database:", err.message);
        // console.error("info maition:", {
        //     host: process.env.LOCALHOST_CONNECT_DATABASE,
        //     user: "postgres", // Thay đổi nếu bạn sử dụng tên người dùng khác.
        //     max: 20,
        //     port: 5433, // Sử dụng giá trị từ biến môi trường.
        //     password: process.env.DATABASE_PASSWORD, // Sử dụng giá trị từ biến môi trường.
        //     database: process.env.DATABASE_NAME, // Sử dụng giá trị từ biến môi trường.
        //     idleTimeoutMillis: 30000,
        //     connectionTimeoutMillis: 4000,
        //     ssl: {
        //         rejectUnauthorized: false,
        //     },
        // });
        return;
    }
    // console.error("info maition:", {
    //     host: process.env.LOCALHOST_CONNECT_DATABASE,
    //     user: "postgres", // Thay đổi nếu bạn sử dụng tên người dùng khác.
    //     max: 20,
    //     port: 5433, // Sử dụng giá trị từ biến môi trường.
    //     password: process.env.DATABASE_PASSWORD, // Sử dụng giá trị từ biến môi trường.
    //     database: process.env.DATABASE_NAME, // Sử dụng giá trị từ biến môi trường.
    //     idleTimeoutMillis: 30000,
    //     connectionTimeoutMillis: 4000,
    //     ssl: {
    //         rejectUnauthorized: false,
    //     },
    // });
    console.log("Database connected!");
});

module.exports = {
    pool,
};
