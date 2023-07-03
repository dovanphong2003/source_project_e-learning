const { createUser } = require("../services/CRUD_UserService");
const bcrypt = require("bcrypt");
const createUserAPI = async (req, res) => {
    const { fullName, email, password, additionalInfo, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const respon = await createUser(
        fullName,
        email,
        hashPassword,
        additionalInfo,
        role
    );
    if (respon !== null) {
        res.status(200).json({
            EC: 0,
            response: "create user success!",
        });
    } else {
        res.status(404).json({
            EC: "can't create user",
        });
    }
};
module.exports = {
    createUserAPI,
};
