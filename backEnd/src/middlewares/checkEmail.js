const { pool } = require("../config/database"); // use pool
const checkEmailMiddle = async (req, res, next) => {
    const { email } = req.body;
    try {
        const response = await pool.query(
            "SELECT count(user_id)  FROM users WHERE user_email = $1",
            [email]
        );
        if (Number(response.rows[0].count)) {
            return res.status(400).json({
                errorcode: "Email đã tồn tại !",
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(400).json({
            errorcode: error,
        });
    }
};
module.exports = {
    checkEmailMiddle,
};
