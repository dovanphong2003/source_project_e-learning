import { CheckToken } from "./CheckToken";
import { RefeshToken } from "./RefeshToken";
import { DeleteCookie } from "./DeleteToken";
import { useNavigate } from "react-router-dom";
// const fncgetInfoUserByAccessTokenAPI = async () => {
//     try {
//         const response = await axios.get(
//             `${process.env.REACT_APP_URL_BACKEND}/getInfoUserByAccessTokenAPI?accessToken=${AccessToken}`
//         );
//         setDataUser(response.data.data);
//     } catch (error) {
//         if (error.response.data.ec.message === "jwt expired") {
//             const newtoken = await RefeshToken();
//             getIsAccess(newtoken);
//             localStorage.setItem("accessToken", newtoken);
//         }
//     }
// };
// useEffect(() => {
//     fncgetInfoUserByAccessTokenAPI();
// }, [localStorage.getItem("accessToken")]);
const VerifyToken = async () => {
    let checkVerifyToken = false;
    const funcVerify = async () => {
        if (localStorage.getItem("accessToken")) {
            try {
                const response = await CheckToken();

                if (response.id || response.role) {
                    checkVerifyToken = false;
                    return true;
                }
                if (response === "jwt expired") {
                    if (!checkVerifyToken) {
                        // setting start refeshToken
                        checkVerifyToken = true;
                        const newtoken = await RefeshToken();
                        localStorage.setItem("accessToken", newtoken);

                        // setting end refreshToken
                        checkVerifyToken = false;
                        return true;
                    } else {
                        return true;
                    }
                }
                if (response === "jwt malformed") {
                    await DeleteCookie();
                    // navigate("/log-in");
                    checkVerifyToken = false;
                    return false;
                }
                // getIdUser(response.id);
                // if (isRole !== "virtualUser") {
                //     // setUser(response.role);
                // }
                // setCheckLogin(true);
            } catch (error) {
                // Xử lý lỗi nếu có
                checkVerifyToken = false;
                return false;
            }
        } else {
            checkVerifyToken = false;
            return false;
        }
    };
    return await funcVerify;
};
export { VerifyToken };
