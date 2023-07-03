const { pool } = require("../config/database"); // use pool
const jwt = require("jsonwebtoken");
const createAccessToken = async (email) => {
    const response = await pool.query(
        "SELECT user_id,user_role,user_name FROM users WHERE user_email = $1",
        [email]
    );
    const { user_role, user_id, user_name } = response.rows[0];
    const payload = {
        id: user_id,
        email: email,
        role: user_role,
        name: user_name,
    };
    const secretKey = process.env.SECRETKEY_ACCOUNT_USER_LOGIN;
    const expiresIn = "20s";
    const accessToken = jwt.sign(payload, secretKey, { expiresIn });
    return accessToken;
};

const createRefreshToken = async (email) => {
    const response = await pool.query(
        "SELECT user_id,user_role,user_name FROM users WHERE user_email = $1",
        [email]
    );
    const { user_role, user_id, user_name } = response.rows[0];
    const currentDate = new Date();
    // Lấy các thành phần ngày, tháng, năm
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
    const year = currentDate.getFullYear();
    const payload = {
        id: user_id,
        role: user_role,
        name: user_name,
        email: email,
        createToken: `${day}/${month}/${year}`,
    };
    const expiresIn = "365d";
    const secretKey = process.env.SECRETKEY_REFESH_ACCOUNT_USER_LOGIN;
    const refeshToken = jwt.sign(payload, secretKey, { expiresIn });
    return refeshToken;
};

module.exports = {
    createAccessToken,
    createRefreshToken,
};
