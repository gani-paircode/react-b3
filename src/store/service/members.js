import axios from "axios";

import { getAuthHeaders } from "./helper";
import { API_BASE_URL } from "./constants";

export const fetchUsers = () => {
    return axios.get(`${API_BASE_URL}/users`, {
        headers: getAuthHeaders(),
    });
}

export const fetchUserById = (id) => {
    return axios.get(`${API_BASE_URL}/users/${id}`, {
        headers: getAuthHeaders(),
    });
}

export const createUser = (data) => {
    return axios.post(`${API_BASE_URL}/users`, data, {
        headers: getAuthHeaders(),        
    });
}