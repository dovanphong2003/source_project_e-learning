const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../services/CreateTokenUser");

const refeshTokenAPI = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; // Lấy giá trị của refreshToken từ cookie
        if (refreshToken) {
            const decode = jwt.verify(
                refreshToken,
                process.env.SECRETKEY_REFESH_ACCOUNT_USER_LOGIN
            );
            const accessTokenNew = await createAccessToken(decode.email);
            res.status(200).json({
                accessTokenNew: accessTokenNew,
            });
        } else {
            res.status(404).json({
                ec: "refreshToken not defined",
            });
        }
    } catch (error) {
        console.log("err: ", error);
        res.status(404).json({
            error: error,
        });
    }
};

module.exports = {
    refeshTokenAPI,
};
