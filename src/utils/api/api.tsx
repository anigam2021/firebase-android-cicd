
import commonFunction from "@app/utils/common-function";
import { apiConstants } from "@app/constants";
import i18next from 'i18next';

/**
 *
 * @param endPoint api end point
 * @param params request data
 * @param successCallback function for handle success response
 * @param errorCallback  function for handle error response
 */
const postApiCall = (endPoint: string, params: any, data: any, successCallback: Function, errorCallback: Function) => {
    commonFunction.axios.post(endPoint, data, { params })
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            handleErrors(error)
            errorCallback(error);
        })
}

const fileUpload = (endPoint: string, data: any, params: any, successCallback: Function, errorCallback: Function) => {
    commonFunction.axios.post(endPoint, data, {
        headers: { 'Content-Type': 'multipart/form-data' }, params
    })
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            handleErrors(error)
            errorCallback(error);
        })
}
/**
 *
 * @param endPoint api end point
 * @param params api url parameter
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const getApiCall = (endPoint: string, params: string | any, data: any, successCallback: Function, errorCallback: Function) => {

    commonFunction.axios.get(endPoint, { params, data })
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            handleErrors(error)
            errorCallback(error);
        })
}

/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const deleteApiCall = (
    endPoint: string,
    successCallback: Function,
    errorCallback: Function,
    params: string = ""
) => {
    commonFunction.axios
        .delete(endPoint + params, {})
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            handleErrors(error)
            errorCallback(error);
        })
};


/**
 * 
 * @param endPoint api end point 
 * @param params api request data
 * @param successCallback function for handle success response 
 * @param errorCallback function for handle error response
 */
const patchApiCall = (endPoint: string, params: object, successCallback: Function, errorCallback: Function) => {

    commonFunction.axios.patch(endPoint, params)
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            handleErrors(error)
            errorCallback(error);
        })
}

/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const putApiCall = (endPoint: string, params: object, successCallback: Function, errorCallback: Function) => {

    commonFunction.axios.put(endPoint, params)
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            handleErrors(error)
            errorCallback(error);
        })
}

const handleErrors = (error: any) => {
    if (!commonFunction.isNullUndefined(error)) {
        if (error.message === apiConstants.API_ERROR_MESSAGE.NETWORK_ERROR) {
            commonFunction.showSnackbar(i18next.t("network_error"))
        }
        else if (error.code === apiConstants.API_ERROR_MESSAGE.ECONNABORTED) {
            commonFunction.showSnackbar(i18next.t("something_went_wrong_please_try_again_later"))
        }
        else {
            if (error?.response?.data?.status === apiConstants.STATUS_401) {
                console.log("error", error)
            }
            else if (error?.response?.data?.status >= 400 && error?.response?.data?.status < 500) {
                commonFunction.showSnackbar(i18next.t(error?.response?.data?.error_description))
            } else {
                commonFunction.showSnackbar(i18next.t("something_went_wrong_please_try_again_later"))
            }
        }
    } else {
        commonFunction.showSnackbar(i18next.t("something_went_wrong_please_try_again_later"))
    }
}


/**
 * export all function
 */
export default {
    fileUpload,
    postApiCall,
    getApiCall,
    patchApiCall,
    putApiCall,
    deleteApiCall,
}


