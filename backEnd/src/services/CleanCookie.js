const cleanCookieAPI = async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true, // use with http, not javascript
            secure: true, // if true --> cookie only sent with https
            sameSite: "none",
            path: "/",
        });
        res.status(401).json({
            result: "delete success",
        });
    } catch (error) {
        res.status(401).json({
            ec: error,
        });
    }
};
module.exports = {
    cleanCookieAPI,
};
