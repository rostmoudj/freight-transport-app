import axios from 'axios';

const API_BASE_URL = 'https://api.freight-transport.com'; // Replace with your actual API base URL

// Set up axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors for request and response
api.interceptors.request.use(
    (config) => {
        // Add any request headers or configurations here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

// Example API calls
export const fetchShipments = () => {
    return api.get('/shipments');
};

export const fetchVehicles = () => {
    return api.get('/vehicles');
};

export const fetchDrivers = () => {
    return api.get('/drivers');
};

// Add more API functions as needed

export default api;