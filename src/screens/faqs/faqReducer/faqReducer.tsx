import types from "../faqAction/types";
import authTypes from "@screen/auth/authAction/types";
const initialState = {
    isLoading: false,
    faqList: [],

};

export const faqReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.FAQ_LIST:
            return {
                ...state,
                faqList: action.faqList,
                isLoading: false,

            };
        case types.FAQ_LOADER:
            return {
                ...state,
                isLoading: action.isLoading,

            };
        case authTypes.TURN_OFF_ALL_LOADER:
            return {
                ...state,
                isLoading: false,
            }
        case authTypes.LOGOUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
};