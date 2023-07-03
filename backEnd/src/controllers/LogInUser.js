const { loginUser } = require("../services/CRUD_UserService");
const jwt = require("jsonwebtoken");
const loginUserAPI = async (req, res) => {
    const { email } = req.body;
    const result = await loginUser(email);
    const { accessToken, refeshToken } = result;
    res.cookie("refreshToken", refeshToken, {
        maxAge: 1000 * 60 * 60 * 365, // Set time live cookie (1 year)
        httpOnly: true, // use with http, not javascript
        secure: true, // if true --> cookie only sent with https
        sameSite: "none",
        path: "/",
    });
    const decode = jwt.verify(
        accessToken,
        process.env.SECRETKEY_ACCOUNT_USER_LOGIN
    );
    const role = decode.role;
    const nameUser = decode.name;
    return res.status(200).json({
        EC: 0,
        tokenAcessUser: accessToken,
        role: role,
        name: nameUser,
    });
};
module.exports = {
    loginUserAPI,
};
