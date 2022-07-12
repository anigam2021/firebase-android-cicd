import types from "@app/screens/my-deliveries/deliveriesActions/types";
import authTypes from "@screen/auth/authAction/types";

const initialState = {
    isLoading: false,
    upcomingDeliveriesData: [],
    pastDeliveriesData: [],
};

export const fetchUpComingDeliveriesDataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.HANDLE_LOADER:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case types.UPCOMING_DELIVERY_LIST:
            return {
                ...state,
                isLoading: action.isLoading,
                upcomingDeliveriesData: action.upcomingDeliveriesData,
            }
        case authTypes.LOGOUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
}


export const fetchPastDeliveriesDataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.HANDLE_LOADER:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case types.PAST_DELIVERY_LIST:
            return {
                ...state,
                isLoading: action.isLoading,
                pastDeliveriesData: action.pastDeliveriesData,
            }
        case authTypes.LOGOUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
}