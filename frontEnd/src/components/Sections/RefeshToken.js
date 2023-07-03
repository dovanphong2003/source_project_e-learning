import axios from "axios";
export const RefeshToken = async () => {
    try {
        const refeshToken = await axios.get(
            "http://localhost:8081/refeshTokenAPI",
            { withCredentials: true } // cai con cu cac nay de gui http only cookie tu phia client len server
        );
        return refeshToken.data.accessTokenNew;
        // if(responseVerify)
    } catch (error) {
        console.log("loi nang roi bro:", error);
        if (error.response.data.ec) {
            return error.response.data.ec;
        } else {
            return "Lỗi nặng rồi bro !";
        }
    }
};
