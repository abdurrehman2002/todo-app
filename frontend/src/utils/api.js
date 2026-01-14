export const BASE_URL = window.location.hostname === 'localhost'
    ? "http://localhost:3200"
    : "https://todo-app-backend-sooty.vercel.app";

export const apiRequest = async (endpoint, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const getCookie = (name) => {
        const cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    const token = getCookie("token");

    const config = {
        ...options,
        credentials: 'include',
        headers: {
            ...defaultHeaders,
            ...options.headers,
            'Authorization': token ? `Bearer ${token}` : '',
        },
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        return await response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};
