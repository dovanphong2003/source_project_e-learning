const { Pool } = require("pg");
require("dotenv").config(); // Đảm bảo đã cài đặt gói dotenv và gọi config().

const pool = new Pool({
    host: process.env.LOCALHOST_CONNECT_DATABASE,
    user: "postgres", // Thay đổi nếu bạn sử dụng tên người dùng khác.
    max: 20,
    port: process.env.PORT_DATABASE_CONNECT, // Sử dụng giá trị từ biến môi trường.
    password: process.env.DATABASE_PASSWORD, // Sử dụng giá trị từ biến môi trường.
    database: process.env.DATABASE_NAME, // Sử dụng giá trị từ biến môi trường.
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 4000,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
        return;
    }
    console.log("Database connected!");
});

module.exports = {
    pool,
};
