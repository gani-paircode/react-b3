import axios from "axios";
export const doLogin = async (id, password) => {
    return axios.post("http://localhost:5000/login/v1", {
        phoneNumber: id,
        password
    });
}

export const updatePass = async (currentPass, newPass1, newPass2) => {
    // return axios.post()
}
