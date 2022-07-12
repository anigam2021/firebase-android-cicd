import types from "../menuAction/types";
import authTypes from "@screen/auth/authAction/types";
const initialState = {
    isLoading: false,
    menuList: [],
    selectedTimeSlot: "",
    selectedDayDeliverySlots: [],
    selectedDayProducts: [],
    selectedDeliverySlotName: "",
    selectedDateIndex: 0,
    selectedSlotIndex: 0,
    selectedMeal: null,
    orderBefore: "",
    pullOnRefreshLoader: false,
};

export const menuReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case types.HANDLE_MENU_LOADER:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case authTypes.TURN_OFF_ALL_LOADER:
            return {
                ...state,
                isLoading: false,
            }

        case types.MENU_LIST:
            return {
                ...state,
                menuList: action.menuList,
                selectedTimeSlot: action.selectedTimeSlot,
                selectedDayDeliverySlots: action.selectedDayDeliverySlots,
                selectedDayProducts: action.selectedDayProducts,
                selectedDeliverySlotName: action.selectedDeliverySlotName,
                orderBefore: action.orderBefore,
                isLoading: false,
            }

        case types.SET_SELECTED_TIMESLOT:
            return {
                ...state,
                selectedDayDeliverySlots: JSON.parse(JSON.stringify(action.selectedDayDeliverySlots)),
                orderBefore: action.orderBefore,
            }

        case types.SET_SELECTED_DELIVERY_AND_SLOT:
            return {
                ...state,
                menuList: action.menuList,
                selectedTimeSlot: action.selectedTimeSlot,
                selectedDeliverySlotName: action.selectedDeliverySlotName,
                selectedSlotIndex: action.selectedSlotIndex,
            }

        case types.SET_SELECTED_DAY_SLOT_AND_PRODUCT:
            return {
                ...state,
                selectedDayDeliverySlots: action.selectedDayDeliverySlots,
                selectedDayProducts: action.selectedDayProducts,
                selectedTimeSlot: action.selectedTimeSlot,
                selectedDeliverySlotName: action.selectedDeliverySlotName,
                selectedDateIndex: action.selectedDateIndex,
                selectedSlotIndex: action.selectedSlotIndex,
                orderBefore: action.orderBefore,
            }

        case types.INCREASE_DECREASE_BASKET_QUANTITY_PRODUCT:
            return {
                ...state,
                menuList: action.menuList,
                selectedDayProducts: action.selectedDayProducts,
            }

        case types.SET_MEAL_OVERVIEW_DATA:
            return {
                ...state,
                selectedMeal: action.selectedMeal,
            }
        case authTypes.LOGOUT:
            return {
                ...initialState
            }
        case authTypes.USER_DETAILS:
            return {
                ...initialState
            }
        case types.RESET_MENU_DATA_AFTER_PLACE_ORDER:
            return {
                ...initialState,
                isLoading: action.isLoading,
            }
        case types.PULL_ON_REFRESH_LOADER:
            return {
                ...state,
                pullOnRefreshLoader: action.pullOnRefreshLoader,
            }
        default:
            return state;
    }
};