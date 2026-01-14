export const BASE_URL = window.location.hostname === 'localhost'
    ? "http://localhost:3200"
    : "https://todo-app-backend-sooty.vercel.app";

export const apiRequest = async (endpoint, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const config = {
        ...options,
        credentials: 'include',
        headers: {
            ...defaultHeaders,
            ...options.headers,
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
