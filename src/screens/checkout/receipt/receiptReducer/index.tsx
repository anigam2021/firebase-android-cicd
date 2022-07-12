import types from "@app/screens/checkout/order/orderAction/types";
import receiptTypes from '@app/screens/checkout/receipt/receiptAction/types';
import authTypes from "@screen/auth/authAction/types";
const initialState = {
    isLoading: false,
    orderNumber: "",
    receiptOrderData: [],
};

export const fetchOrderReceiptReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.HANDLE_LOADER:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case receiptTypes.RECEIPT_DATA:
            return {
                ...state,
                isLoading: action.isLoading,
                orderNumber: action.orderNumber,
                receiptOrderData: action.receiptOrderData,
            }
        case authTypes.LOGOUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
}
