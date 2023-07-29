import axios from "axios"; 
import { API_BASE_URL} from './constants';
export const doLogin = async (id, password) => {
    return axios.post(`${API_BASE_URL}/login/v1`, {
        phoneNumber: id,
        password
    });
}

export const updatePass = async (currentPass, newPass1, newPass2) => {
    // return axios.post()
}
