import types from "@screen/basket/basketAction/types";
import authTypes from "@screen/auth/authAction/types";

interface Basket {
    isLoading: boolean;
    basketList: any;
    basketCount: number;
    basketDeliverySum: number;
    basketPriceItemSum: number;
    basketPriceTotalSum: number;
    basketBillBreakdown: any;
    promoName: string;
    promoUseId: string;
    priceDiscountSum: number;
    comeFromPromoCode: boolean;
    showErrorMessage: boolean;

}

const initialState: Basket = {
    isLoading: false,
    basketList: [],
    basketCount: 0,
    basketDeliverySum: 0,
    basketPriceItemSum: 0,
    basketPriceTotalSum: 0,
    basketBillBreakdown: [],
    promoName: '',
    promoUseId: '',
    priceDiscountSum: 0,
    comeFromPromoCode: false,
    showErrorMessage: false,
};

export const basketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.BASKET_LIST:
            return {
                ...state,
                basketList: action.basketList,
                basketCount: action.basketCount,
                basketDeliverySum: action.basketDeliverySum,
                basketPriceItemSum: action.basketPriceItemSum,
                basketPriceTotalSum: action.basketPriceTotalSum,
                basketBillBreakdown: action.basketBillBreakdown,
                promoName: action.promoName,
                promoUseId: action.promoUseId,
                priceDiscountSum: action.priceDiscountSum,
            };

        case types.HANLDE_LOADER_ADD_REMOVE_BASKET:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case authTypes.TURN_OFF_ALL_LOADER:
            return {
                ...state,
                isLoading: false,
            }

        case authTypes.LOGOUT:
            return {
                ...initialState
            }
        case types.PROMO_CODE:
            return {
                ...state,
                promoCode: action.promoCode
            }
        case authTypes.USER_DETAILS:
            return {
                ...initialState
            }
        case types.CLEAR_BASKET_DATA_ON_LOGOUT:
            return {
                // ...state,
                // basketList: [],
                // basketCount: 0,
                ...initialState
            }
        case types.COME_PROMO_CODE:
            return {
                ...state,
                comeFromPromoCode: action.comeFromPromoCode
            };
        default:
            return state;
    }
};