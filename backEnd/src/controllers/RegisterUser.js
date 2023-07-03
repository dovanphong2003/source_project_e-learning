const { registerUser } = require("../services/CRUD_UserService");
const bcrypt = require("bcrypt");

const registerUserAPI = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await registerUser(email, name, hashPassword);
        return res.status(200).json({
            EC: 0,
            response: "Đăng kí thành công !",
        });
    } catch (error) {
        console.log("error: ", error);
        return res.status(400).json({
            EC: error,
        });
    }
};

module.exports = {
    registerUserAPI,
};
