const express = require("express");
const routerAPIUser = express.Router();
const { registerUserAPI } = require("../controllers/RegisterUser");
const { loginUserAPI } = require("../controllers/LogInUser");
const { checkEmailMiddle } = require("../middlewares/checkEmail");
const { checkAccount } = require("../middlewares/checkAccount");
const { refeshTokenAPI } = require("../services/RefeshToken");
const { verifyTokenAPI } = require("../middlewares/VerifyTokenUser");
const { cleanCookieAPI } = require("../services/CleanCookie");
const {
    getInfoUserAPI,
    getInfoAdminAPI,
    getInfoStudentAPI,
} = require("../services/CRUD_Info_User");
const { createUserAPI } = require("../controllers/CRUD_user");
///////// list router API
routerAPIUser.post("/registerAPI", checkEmailMiddle, registerUserAPI); // no se trai qua middle xong moi den regis...

routerAPIUser.post("/loginAPI", checkAccount, loginUserAPI);
routerAPIUser.get("/refeshTokenAPI", refeshTokenAPI);
routerAPIUser.post("/verifyTokenAPI", verifyTokenAPI);
routerAPIUser.delete("/cleanCookieAPI", cleanCookieAPI);
routerAPIUser.get("/getInfoUserAPI", getInfoUserAPI);
routerAPIUser.get("/getInfoAdminAPI", getInfoAdminAPI);
routerAPIUser.get("/getInfoStudentAPI", getInfoStudentAPI);
routerAPIUser.post("/createUserAPI", checkEmailMiddle, createUserAPI);

////////////////////
module.exports = {
    routerAPIUser,
};
