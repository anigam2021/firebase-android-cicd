import types from "../privacyPolicyAction/types";
import authTypes from "@screen/auth/authAction/types";
const initialState = {
    isLoading: false,
    privacyPolicyView: [],

};

export const privacyPolicyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.PRIVACY_POLICY_VIEW:
            return {
                ...state,
                privacyPolicyView: action.privacyPolicyView,
                isLoading: false

            };
        case types.PRIVACY_POLICY_LOADER:
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
                ...initialState,
            }
        default:
            return state;
    }
};
