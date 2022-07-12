import types from "@screen/auth/authAction/types";

const initialState = {
    isLoading: false,
    isAppLoading: true,
    userPresent: false,
    challengeId: '',
    userId: '',
    accessToken: '',
    refreshToken: '',
    dummy: "",
    language: null,
    email: '',
    loginEmail: ""
};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.SWITCH_ROUTE:
            return {
                ...state,
                isLoading: action.isLoading,
                isAppLoading: action.isAppLoading,
                userPresent: action.userPresent
            };
        case types.SPLASHLOADING:
            return {
                ...state,
                isAppLoading: action.isAppLoading,
            }
        case types.EMAIL:
            return {
                ...state,
                email: action.email,
            }
        case types.STORE_EMAIL:
            return {
                ...state,
                loginEmail: action.email,
            }
        case types.CHALLENGE_ID:
            return {
                ...state,
                challengeId: action.challengeId,
            }
        case types.LANGUAGE:
            return {
                ...state,
                language: action.language
            }

        case types.USER_DETAILS:
            return {
                ...state,
                userId: action.userDetails.userId,
                accessToken: action.userDetails.accessToken,
                refreshToken: action.userDetails.refreshToken,
                userPresent: action.userDetails.userPresent
            }

        case types.SET_REFRESH_TOKEN:
            return {
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            }

        case types.LOGOUT:
            return {
                ...state,
                isLoading: false,
                isAppLoading: true,
                userPresent: false,
                challengeId: '',
                userId: '',
                accessToken: '',
                refreshToken: '',
                dummy: "",
                email: ''
            }
        default:
            return state;
    }
};