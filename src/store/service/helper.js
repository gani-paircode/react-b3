export const AUTH_HEADER_NAMES = {
    PHONE: 'x-auth-phone',
    TOKEN: 'x-auth-token'
}

export const getAuthHeaders = () => ({
    [AUTH_HEADER_NAMES.PHONE]: localStorage.getItem(AUTH_HEADER_NAMES.PHONE),
    [AUTH_HEADER_NAMES.TOKEN]: localStorage.getItem(AUTH_HEADER_NAMES.TOKEN)
})

export const setAuthHeaders = (phoneNumber, loginToken) => {
    localStorage.setItem(AUTH_HEADER_NAMES.PHONE, phoneNumber),
    localStorage.setItem(AUTH_HEADER_NAMES.TOKEN, loginToken)
};

export const resetAuthHeaders = (phoneNumber, loginToken) => {
    localStorage.removeItem(AUTH_HEADER_NAMES.PHONE),
    localStorage.removeItem(AUTH_HEADER_NAMES.TOKEN)
};

export const getAdminNumberFromLocal = () => localStorage.getItem(AUTH_HEADER_NAMES.PHONE) || '';