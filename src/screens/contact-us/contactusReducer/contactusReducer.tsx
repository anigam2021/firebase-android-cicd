
import authTypes from "@screen/auth/authAction/types";
import types from "@app/screens/contact-us/contactusAction/types";
const initialState = {
    isLoading: false,
    email: {},

};

export const contactUsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.CONTACT_US:
            return {
                ...state,
                email: action.email,

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
