import types from "@app/screens/terms-conditions/termsConditionsAction/types";
import authTypes from "@screen/auth/authAction/types";
const initialState = {
    isLoading: false,
    termsConditionView: [],
};
export const termsConditionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.TERMS_CONDITION_VIEW:
            return {
                ...state,
                termsConditionView: action.termsConditionView,
                isLoading: false
            };
        case types.TERMS_CONDITION_LOADER:
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
