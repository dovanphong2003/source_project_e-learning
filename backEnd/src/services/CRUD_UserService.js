const { pool } = require("../config/database"); // use pool
const { createRefreshToken, createAccessToken } = require("./CreateTokenUser");
require("dotenv").config();
const registerUser = async (email, name, password, avatar_url) => {
    // create id user
    function generateRandomNumber() {
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
        return parseInt(randomNumber.toString().substring(0, 8));
    }
    const userID = generateRandomNumber();
    try {
        const response = await pool.query(
            "INSERT INTO users (user_id,user_name,user_email,user_password,user_role,avatar_url) VALUES ($1,$2,$3,$4,$5,$6)",
            [
                userID,
                name,
                email,
                password,
                "student",
                avatar_url ? avatar_url : "NULL",
            ]
        );
        return response;
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
};

const loginUser = async (email) => {
    try {
        const accessToken = await createAccessToken(email);
        const refeshToken = await createRefreshToken(email);
        return { accessToken, refeshToken };
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
};

const createUser = async (nameUser, email, password, infoUser, role) => {
    // create id user
    function generateRandomNumber() {
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
        return parseInt(randomNumber.toString().substring(0, 8));
    }
    const userID = generateRandomNumber();
    try {
        const response = await pool.query(
            `INSERT INTO users(user_id,user_name,user_email,user_password,user_role,moreinfo) 
            VALUES($1,$2,$3,$4,$5,$6)`,
            [userID, nameUser, email, password, role, infoUser]
        );
        return response;
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
};
module.exports = {
    registerUser,
    loginUser,
    createUser,
};
