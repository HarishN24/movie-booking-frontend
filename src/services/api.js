import axios from "axios";

const api = axios.create({

    baseURL:
    "https://movie-booking-backend-production-934e.up.railway.app"
});

api.interceptors.request.use(
(config) => {

    const token =
        localStorage.getItem(
            "token"
        );

    if(token){

        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

export default api;