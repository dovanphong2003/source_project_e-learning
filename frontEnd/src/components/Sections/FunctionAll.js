import { CheckToken } from "./CheckToken";
import { RefeshToken } from "./RefeshToken";
import { DeleteCookie } from "./DeleteToken";
import { useNavigate } from "react-router-dom";
// const fncgetInfoUserByAccessTokenAPI = async () => {
//     try {
//         const response = await axios.get(
//             `${process.env.REACT_APP_URL_BACKEND}/getInfoUserByAccessTokenAPI?accessToken=${AccessToken}`
//         );
//         console.log("data id user: ", response.data.data);
//         setDataUser(response.data.data);
//     } catch (error) {
//         if (error.response.data.ec.message === "jwt expired") {
//             const newtoken = await RefeshToken();
//             getIsAccess(newtoken);
//             localStorage.setItem("accessToken", newtoken);
//         }
//         console.log("error get id user: ", error);
//     }
// };
// useEffect(() => {
//     fncgetInfoUserByAccessTokenAPI();
// }, [localStorage.getItem("accessToken")]);
const VerifyToken = async () => {
    // const navigate = useNavigate();
    let checkVerifyToken = false;
    const funcVerify = async () => {
        if (localStorage.getItem("accessToken")) {
            console.log("bat dau verify");

            try {
                const response = await CheckToken();
                console.log("aaaaaaaa: ", response);
                if (response.id || response.role) {
                    console.log("token chua het han !");
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
                console.log("errrrrrrrrrrrrr: ", error);
                checkVerifyToken = false;
                return false;
            }
        } else {
            console.log("không có access token");
            checkVerifyToken = false;
            return false;
        }
    };
    return await funcVerify;
};
export { VerifyToken };
