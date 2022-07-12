import types from "./types";
import Utils from "@app/utils";
import { endpoints, PUT } from '@app/constants';
import Config from '@app/utils/config'
import RNRestart from 'react-native-restart';

export const updateSplashState = (params: boolean,) => {
    return function (dispatch: Function, getState: Function) {
        dispatch({
            type: types.SPLASHLOADING,
            isAppLoading: params
        })
    }
}

export const onSignInWithEmail = (params: any, data: any, successCallback: Function, errorCallback: Function) => {
    return function (dispatch: Function, getState: Function) {
        Utils.Api.postApiCall(
            endpoints.signInWithEmailLink,
            {},
            data,
            (response: any) => {
                successCallback(response);
                dispatch({
                    type: types.EMAIL,
                    email: data
                })
            },
            (error: any) => {
                errorCallback(error)
            }
        )
    };
}




export const getChallengeId = (params: any, data: any, successCallBack: Function, errorCallBack: Function) => {
    return function (dispatch: Function, getState: Function) {
        Utils.Api.postApiCall(endpoints.getChallengeId, params, data,
            (response: any) => {
                successCallBack(response)
            },
            (error: any) => {
                errorCallBack(error)
            })
    }
}



export const sendMailSignInLink = (params: any, data: any, successCallBack: Function, errorCallBack: Function) => {
    return function (dispatch: Function, getState: Function) {
        Utils.Api.postApiCall(endpoints.mailSignInLink, params, data,
            (response: any) => {
                successCallBack(response)
            },
            (error: any) => {
                errorCallBack(error)
            })
    }
}


export const refreshNewAccessToken = (params: any, data: any, successCallBack: Function, errorCallBack: Function) => {
    return function (dispatch: Function, getState: Function) {
        Utils.Api.postApiCall(endpoints.refreshToken, params, data,
            (response: any) => {
                console.log("response", response);

                dispatch({
                    type: types.SET_REFRESH_TOKEN,
                    refreshToken: response.data.refreshToken,
                    accessToken: response.data.accessToken
                })
                successCallBack(response)
            },
            (error: any) => {
                errorCallBack(error)
            })
    }
}

export const language = (updatedLanguage: any) => {
    return function (dispatch: Function, getState: Function) {
        PUT(`${Config().accesspoint}${endpoints.language}`, updatedLanguage, "").then((res) => {

            dispatch({
                type: types.LANGUAGE,
                language: updatedLanguage
            })
            setTimeout(() => {
                RNRestart.Restart();
            }, 1000)
        }
        ).catch((err) => {
            dispatch({
                type: types.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
        })
    }

}
