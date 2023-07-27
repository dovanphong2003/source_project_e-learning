const { pool } = require("../config/database"); // use pool
const bcrypt = require("bcrypt");
const checkAccount = async (req, res, next) => {
    const { password, email, checkLogin } = req.body;
    try {
        const response = await pool.query(
            "SELECT user_password,user_email FROM users WHERE user_email = $1",
            [email]
        );
        if (!Number(response.rowCount)) {
            return res.status(404).json({
                EC: "Email không tồn tại, vui lòng kiểm tra lại !",
            });
        }
        if (password === response.rows[0].user_password) {
            next();
        } else {
            const hashedPassword = response.rows[0].user_password;
            try {
                const result = await bcrypt.compare(password, hashedPassword);
                if (result) {
                    next();
                } else {
                    return res.status(404).json({
                        EC: "Mật khẩu không chính xác !",
                    });
                }
            } catch (error) {
                console.log("error: ", error);
                return res.status(500).json({
                    EC: "error server",
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            EC: error,
        });
    }
};
module.exports = {
    checkAccount,
};
