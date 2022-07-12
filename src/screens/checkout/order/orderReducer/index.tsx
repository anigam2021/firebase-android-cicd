import types from '@app/screens/checkout/order/orderAction/types';
import authTypes from "@screen/auth/authAction/types";
const initialState = {
    isLoading: false,
    orderNumber: "",
    paymentStatus: ""
};

export const storeOrderNumberReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.HANDLE_LOADER:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case types.HANDLE_PAYMENT_STATUS:
            return {
                ...state,
                paymentStatus: action.paymentStatus,
            }
        case authTypes.LOGOUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
}