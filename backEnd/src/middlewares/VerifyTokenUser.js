const jwt = require("jsonwebtoken");
const verifyTokenAPI = async (req, res) => {
    const accessToken = req.body.accessToken;
    if (accessToken) {
        try {
            const decode = await jwt.verify(
                accessToken,
                process.env.SECRETKEY_ACCOUNT_USER_LOGIN
            );
            res.status(200).json({
                roleUser: decode.role,
                idUser: decode.id,
            });
        } catch (error) {
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
    verifyTokenAPI,
};
