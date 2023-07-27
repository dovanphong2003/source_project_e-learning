const { pool } = require("../config/database"); // use pool
const jwt = require("jsonwebtoken");

const getInfoUserAPI = async (req, res) => {
    try {
        const id = req.query.idUser;
        const data = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [id]
        );
        res.status(200).json({
            dataUser: data.rows[0],
        });
    } catch (error) {
        console.log("err get info user: ", error);
        res.status(400).json({ ec: error });
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
const getInfoUserByAccessTokenAPI = async (req, res) => {
    const accessToken = req.query.accessToken;
    console.log("accestoken: ", accessToken);
    if (accessToken) {
        try {
            const decode = await jwt.verify(
                accessToken,
                process.env.SECRETKEY_ACCOUNT_USER_LOGIN
            );
            res.status(200).json({ data: decode });
        } catch (error) {
            console.log("error get info user by access token: ", error);
            res.status(400).json({ ec: error });
            return;
        }
    } else {
        res.status(404).json({
            ec: "Not found accessToken",
        });
    }
};
module.exports = {
    getInfoUserAPI,
    getInfoAdminAPI,
    getInfoStudentAPI,
    getInfoUserByAccessTokenAPI,
};
