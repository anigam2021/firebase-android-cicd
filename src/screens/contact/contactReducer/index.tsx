import types from '@screen/contact/contactAction/types';
import authTypes from '@screen/auth/authAction/types';

const initialState = {
    isLoading: false,
    name: '',
    address: [],
    phone: '',
    deliveryInstructions: '',
    bankList: [],
    selectedBank: null,
    errorMessage: '',
    postalCodeError: false
};

export const checkoutReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.HANDLE_CHECKOUT_LOADER:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case authTypes.TURN_OFF_ALL_LOADER:
            return {
                ...state,
                isLoading: false,
            }

        case types.CHECKOUT_DATA:
            return {
                ...state,
                name: action.name,
                address: action.address,
                phone: action.phone,
                deliveryInstructions: action.deliveryInstructions
            }
        case types.BANK_DATA:
            return {
                ...state,
                bankList: action.bankList,
                selectedBank: action.selectedBank,
                isLoading: false
            }
        case types.API_ERROR_MESSAGE:
            return {
                ...state,
                postalCodeError: action.postalCodeError,
                errorMessage: action.errorMessage
            }
        case authTypes.LOGOUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
}