import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://todoappapi-0i5s.onrender.com/"
})
export default axiosInstance