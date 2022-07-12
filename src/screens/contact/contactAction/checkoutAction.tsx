import {
    GET,
    endpoints,
    PUT,
    screens
} from '@app/constants';
import Config from '@app/utils/config';
import types from "@app/screens/contact/contactAction/types";
import * as NavigationService from "@navigation/navigation-service";
import store from '@app/store';
import authTypes from '@screen/auth/authAction/types';

export const fetchCheckoutData = (shouldGoBack: boolean) => {
    return async (dispatch: any) => {
        dispatch({
            type: types.HANDLE_CHECKOUT_LOADER,
            isLoading: true
        })
        GET(`${Config().accesspoint}${endpoints.accountProfile}`, {}).then(
            (result) => {
                dispatch({
                    type: types.CHECKOUT_DATA,
                    name: result.data.name,
                    address: result.data.address,
                    phone: result.data.phone,
                    deliveryInstructions: result.data.deliveryInstructions,
                })
                if (shouldGoBack) {
                    NavigationService.goBack();
                }
                dispatch({
                    type: types.HANDLE_CHECKOUT_LOADER,
                    isLoading: false
                })
            }).catch(error => {
                dispatch({
                    type: authTypes.TURN_OFF_ALL_LOADER,
                    isLoading: false
                })
            })
    }
}

export const postDeliveryInstruction = (instruction: Text) => {
    return async (dispatch: any) => {
        PUT(`${Config().accesspoint}${endpoints.deliveryInstructions}`, instruction, {}).then(
            result => {
                if (result.status) {
                    dispatch(fetchCheckoutData(true));
                }
            }
        ).catch(error => {
            dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
        })
    }
}

export const postAddAddress = (payload: any, errorCallback: Function) => {
    return async (dispatch: any) => {
        const data = {
            street: payload.street,
            houseNumber: payload.houseNumber,
            postalCode: payload.postalCode
        };
        dispatch({
            type: types.HANDLE_CHECKOUT_LOADER,
            isLoading: true
        })
        PUT(`${Config().accesspoint}${endpoints.addAddress}`, data, {}).then(
            result => {
                if (result.status) {
                    dispatch(fetchCheckoutData(true));
                    // store.dispatch(updatePaymentStatus("pending"))
                }
            }
        ).catch(error => {
            errorCallback(error?.response?.data?.error_description)
            dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
            dispatch({
                type: types.HANDLE_CHECKOUT_LOADER,
                isLoading: false
            })
            dispatch({
                type: types.API_ERROR_MESSAGE,
                postalCodeError: true,
                errorMessage: error.response.data.error_description
            })
        })
    }
}


export const postNumber = (phoneNumber: any, isGoBack: boolean) => {
    return async (dispatch: any) => {
        PUT(`${Config().accesspoint}${endpoints.phoneNumber}`, phoneNumber, {}).then(
            result => {
                if (result.status) {
                    dispatch(fetchCheckoutData(false));
                    if (isGoBack) {
                        NavigationService.goBack();
                    } else {
                        NavigationService.navigate(screens.checkout.checkout.name);
                    }
                }
            }
        ).catch(error => {

            dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
        })
    }
}

export const postName = (name: Text, phoneNumber: any, isGoBack: boolean, postNumberFunctionCall: boolean) => {
    return async (dispatch: any) => {
        PUT(`${Config().accesspoint}${endpoints.name}`, name, {}).then(
            result => {
                if (result.status) {
                    dispatch(fetchCheckoutData(false));
                    if (postNumberFunctionCall) {
                        dispatch(postNumber(phoneNumber, isGoBack))
                    } else {
                        NavigationService.goBack();
                    }
                }
            }
        ).catch(error => {
            dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
        })
    }
}


export const fetchBankData = () => {
    return async (dispatch: any) => {
        dispatch({
            type: types.HANDLE_CHECKOUT_LOADER,
            isLoading: true
        })
        GET(`${Config().accesspoint}${endpoints.bankName}`, {}).then(
            (result) => {
                const bankList = result.data.issuers
                const selectedBank = store.getState().checkoutReducer.selectedBank
                bankList.map((item: any, index: number) => {
                    if (selectedBank && item.name === selectedBank.name) {
                        item.isSelected = true
                    } else {
                        item.isSelected = false
                    }

                })
                dispatch({
                    type: types.BANK_DATA,
                    bankList: bankList,
                    selectedBank: selectedBank,
                    isLoading: false
                })
            }).catch(error => {

                dispatch({
                    type: authTypes.TURN_OFF_ALL_LOADER,
                    isLoading: false
                })
            })

    }
}

export const setSelectedBank = (selectedIndex: number) => {
    return async (dispatch: any) => {
        const tempBankList = store.getState().checkoutReducer.bankList
        tempBankList.map((item: any, index: number) => {
            if (index === selectedIndex) {
                item.isSelected = true
            } else {
                item.isSelected = false
            }

        })
        dispatch({
            type: types.BANK_DATA,
            bankList: tempBankList,
            selectedBank: tempBankList[selectedIndex],
            isLoading: false
        })
        NavigationService.goBack();
    }
}
