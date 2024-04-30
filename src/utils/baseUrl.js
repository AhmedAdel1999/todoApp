import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://662e421aa7dda1fa378c7a2c.mockapi.io/todoapp"
})
export default axiosInstance