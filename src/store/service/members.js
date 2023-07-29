import axios from "axios";

import { getAuthHeaders } from "./helper";

export const fetchUsers = () => {
    return axios.get("http://localhost:5000/users", {
        headers: getAuthHeaders(),
    });
}

export const createUser = (data) => {
    // base url should not be hardcoded
    // make post request here
}