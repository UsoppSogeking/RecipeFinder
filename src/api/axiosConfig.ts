import axios from "axios";

const API_KEY = '490672200bc04f3ca9068f7b9cc93d2a';
const BASE_URL = 'https://api.spoonacular.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey: API_KEY,
    },
});

export default axiosInstance;