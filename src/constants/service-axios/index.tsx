import { Platform, NativeModules } from 'react-native';
import axios from 'axios';
import store from "@app/store";
import types from "@app/screens/auth/authAction/types";
import Config from '@app/utils/config';
import {
    CREDENTIALS_EXPIRED,
    ECONNABORTED,
    NETWORK_ERROR
} from './errorConst';
import i18next from 'i18next';
import commonFunction from "@app/utils/common-function";
import { EATCH_APP_PLATFORM_IOS_X_REQUEST, EATCH_APP_PLATFORM_ANDROID_X_REQUEST } from "@env";

var cancelTokenSource: any = null;
const deviceLanguage = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const checkDeviceLang = () => {
    if (deviceLanguage.includes("nl")) {
        return "nl"
    }
    //Here we can give condition for any of the language.
    else {
        return "en"
    }
}
const APPLICATION_JSON = 'application/json'
const instance = axios.create({
    baseURL: `${Config().accesspoint}`,
    headers: {
        'accept': APPLICATION_JSON,
        'Content-Type': APPLICATION_JSON,
        'X-Requested-With': Platform.OS === "ios" ? EATCH_APP_PLATFORM_IOS_X_REQUEST : EATCH_APP_PLATFORM_ANDROID_X_REQUEST
    },
});

instance.interceptors.request.use(
    (config: any) => {
        const token = store.getState().authReducer.accessToken;
        const language = store.getState().authReducer.language

        config.headers['Accept-Language'] = language ? language : checkDeviceLang()
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log("config", config);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        console.log("result", res)
        return res;
    },
    async (err) => {
        console.log("error", err.response)
        const originalConfig = err.config;
        if (err?.response) {
            if (err?.message === NETWORK_ERROR) {
                commonFunction.showSnackbar(i18next.t("network_error"))
            }
            else if (err?.code === ECONNABORTED) {
                commonFunction.showSnackbar(i18next.t("something_went_wrong_please_try_again_later"))
            } else {
                // Access Token was expired
                if (err?.response?.data?.error === CREDENTIALS_EXPIRED && !originalConfig._retry) {

                    originalConfig._retry = true;
                    try {

                        const rs = await axios({
                            method: 'post',
                            url: 'https://api.acc.eatch.me/identity/refresh',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept-Language': store.getState().authReducer.language ? store.getState().authReducer.language : checkDeviceLang(),
                                'X-Requested-With': Platform.OS === "ios" ? EATCH_APP_PLATFORM_IOS_X_REQUEST : EATCH_APP_PLATFORM_ANDROID_X_REQUEST
                            },
                            data: {
                                refreshToken: store.getState().authReducer.refreshToken
                            }
                        }
                        );

                        const { accessToken, refreshToken } = rs.data;

                        store.dispatch({
                            type: types.SET_REFRESH_TOKEN,
                            refreshToken,
                            accessToken
                        })

                        instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                        const result = instance(originalConfig);
                        return result
                    } catch (_error: any) {
                        if (_error.response && _error.response.data) {
                            return Promise.reject(_error.response.data);
                        }
                        return Promise.reject(_error);
                    }
                }
                else if (err?.response?.data?.status >= 400 && err?.response?.data?.status < 500) {
                    // commonFunction.showSnackbar(i18next.t(err?.response?.data?.error_description))
                } else {
                    commonFunction.showSnackbar(i18next.t("internalServerError"))
                }
            }
        } else {
            commonFunction.showSnackbar(i18next.t("something_went_wrong_please_try_again_later"))
        }
        return Promise.reject(err);
    }
);

export const handleCancelRequest = () => {
    cancelTokenSource.cancel('Request was canceled')
};

export const GET = async (url: string, params: any) => {
    cancelTokenSource = axios.CancelToken.source()

    const getRes = await instance.get(url, { params });
    if (getRes.status === 200) {
        return { data: getRes?.data, status: true };
    } else {
        return { message: getRes?.data?.message, status: false };
    }
};

export const DELETE = async (url: string, body: object) => {
    cancelTokenSource = axios.CancelToken.source()
    const getRes = await instance.delete(url, { data: body });
    if (getRes.status === 200) {
        return { data: getRes.data, status: true };
    } else {
        return { message: getRes.data.message, status: false };
    }
};

export const POST = async (url: string, body: object, options: any) => {
    cancelTokenSource = axios.CancelToken.source()
    const getRes = await instance.post(url, body, options);
    if (getRes.status === 200 || getRes.status === 201) {
        return { data: getRes.data, status: true };
    } else {
        return { message: getRes.data.message, status: false };
    }
};

export const PUT = async (url: string, body: object, options: any) => {
    cancelTokenSource = axios.CancelToken.source()
    const getRes = await instance.put(url, body, options);
    if (getRes.status === 200) {
        return { data: getRes.data, status: true };
    } else {
        return { message: getRes.data.message, status: false };
    }
};