import axios from "axios";

import { getAuthHeaders } from "./helper";

export const fetchUsers = () => {
    return axios.get("http://localhost:5000/users", {
        headers: getAuthHeaders(),
    });
}

export const fetchUserById = (id) => {
    return axios.get(`http://localhost:5000/users/${id}`, {
        headers: getAuthHeaders(),
    });
}

export const createUser = (data) => {
    return axios.get(`http://localhost:5000/users`, {
        headers: getAuthHeaders(),
        method: 'POST',
        data
    });
}