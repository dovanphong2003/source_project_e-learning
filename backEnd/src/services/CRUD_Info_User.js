const { pool } = require("../config/database"); // use pool
const jwt = require("jsonwebtoken");

const getInfoUserAPI = async (req, res) => {
    try {
        const id = req.query.idUser;
        const accessToken = req.query.accessToken;
        if (accessToken) {
            const decode = await jwt.verify(
                accessToken,
                process.env.SECRETKEY_ACCOUNT_USER_LOGIN
            );
            if (decode.id == id) {
                const data = await pool.query(
                    "SELECT * FROM users WHERE user_id = $1",
                    [id]
                );
                res.status(200).json({
                    dataUser: data.rows[0],
                });
            } else {
                res.status(404).json({
                    ec: "error id user",
                });
            }
        }
    } catch (error) {
        console.log("err get info user: ", error);
        if (error === "jwt expired") {
            res.status(400).json({ message: "jwt expired" });
        } else if (error === "")
            res.status(404).json({
                ec: "lỗi nặng rồi bro",
            });
    }
};

const getInfoAdminAPI = async (req, res) => {
    const response = await pool.query(
        `SELECT * FROM users WHERE user_role = $1`,
        ["admin"]
    );
    res.status(200).json({
        dataUser: response.rows,
    });
};
const getInfoStudentAPI = async (req, res) => {
    const response = await pool.query(
        `SELECT * FROM users WHERE user_role = $1`,
        ["student"]
    );
    res.status(200).json({
        dataUser: response.rows,
    });
};
module.exports = {
    getInfoUserAPI,
    getInfoAdminAPI,
    getInfoStudentAPI,
};
