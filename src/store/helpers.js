import _isString from 'lodash/isString';
import _get from 'lodash/get';

export const getLoadingState = () => ({ isFetching: true, errMsg: '', data: null });
export const getErrorState = (errMsg = 'Something went wrong') => ({ isFetching: false, errMsg: errMsg + '', data: null });
export const getSuccessState = (data) => ({ isFetching: false, errMsg: '', data });

export const getAxiosErrorMessage = (error, defaultMessage) => {
    if (_isString(error)) return error;

    const message = _get(error, 'response.data.message');
    if (_isString(message)) return message;
    return defaultMessage;
}