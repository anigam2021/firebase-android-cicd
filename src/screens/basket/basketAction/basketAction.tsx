import {
    GET,
    POST,
    endpoints,
    screens,
    DELETE
} from '@app/constants';
import Config from '@app/utils/config';
import types from '@screen/basket/basketAction/types';
import i18next, { t } from "i18next";
import store from "@app/store";
import { fetchMenuList } from '@app/screens/menu/menu/menuAction/menuAction';
import authTypes from '@screen/auth/authAction/types';
import { basketAction } from '@app/utils/interface';
import * as NavigationService from "@navigation/navigation-service";

export const fetchBasketList = (menuscreen: boolean, successCallBack: any) => {
    const promoName = store.getState().basketReducer?.promoName?.length === 0 || store.getState().basketReducer?.promoName === undefined ? false : true;
    return async (dispatch: any) => {
        GET(`${Config().accesspoint}${endpoints.basketList}`, {}).then(
            result => {
                if (result.status) {
                    const tempBasketBillBreakdown = promoName ? [
                        { title: i18next.t('subTotal'), value: result.data.priceItemsSum },
                        { title: i18next.t('Promotion'), value: result.data.priceDiscountSum },
                        { title: `${i18next.t('deliveryCharges')} (`, deliverySum: result.data.priceDeliveriesSum.toLocaleString("nl-US", { minimumFractionDigits: 2 }), deliveryDays: `x ${result.data.countDeliveries} ${t("days")})`, value: result.data.priceDeliveriesSum },
                        { title: i18next.t('total'), value: result.data.priceTotalSum }]
                        : [
                            { title: i18next.t('subTotal'), value: result.data.priceItemsSum },
                            { title: `${i18next.t('deliveryCharges')} (`, deliverySum: result.data.priceDeliveriesSum.toLocaleString("nl-US", { minimumFractionDigits: 2 }), deliveryDays: `x ${result.data.countDeliveries} ${t("days")})`, value: result.data.priceDeliveriesSum },
                            { title: i18next.t('total'), value: result.data.priceTotalSum }]
                    const initialValue = 0;
                    const basketCount = result.data.deliveries.reduce(function (accumulator: number, curValue: any) {
                        const dayInitialValue = 0;
                        const dayBasketCount = curValue.items.reduce(function (dayBasketCountAccumulator: number, dayBasketCountAccumulatorCurValue: any) {
                            return dayBasketCountAccumulator + dayBasketCountAccumulatorCurValue.count
                        }, dayInitialValue)
                        return accumulator + dayBasketCount

                    }, initialValue)

                    dispatch({
                        type: types.BASKET_LIST,
                        basketList: result.data.deliveries,
                        basketCount: basketCount,
                        basketDeliverySum: result.data.priceDeliveriesSum,
                        basketPriceItemSum: result.data.priceItemsSum,
                        basketPriceTotalSum: result.data.priceTotalSum,
                        basketBillBreakdown: tempBasketBillBreakdown,
                        promoName: result.data.promoName,
                        promoUseId: result.data.promoUseId,
                        priceDiscountSum: result.data.priceDiscountSum,
                    })
                }

                if (menuscreen) {
                    store.dispatch(fetchMenuList())
                }
                successCallBack(result.data.deliveries)
                {
                    !menuscreen &&
                        dispatch({
                            type: types.HANLDE_LOADER_ADD_REMOVE_BASKET,
                            isLoading: false
                        })
                }
            }

        ).catch(err => {
            !menuscreen && dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
        })
    }
}

export const increaseDecreaseBasketQuantity = (payload: basketAction) => {
    const promoName = store.getState().basketReducer?.promoName?.length === 0 || store.getState().basketReducer?.promoName === undefined ? false : true;
    return async (dispatch: any) => {
        const data = {
            date: payload.date,
            deliverySlot: payload.deliverySlot,
            productId: payload.productId,
            variant: payload.variant,
            count: payload.count,
        }
        POST(`${Config().accesspoint}${endpoints.basketList}`, data, {}).then(
            result => {
                if (result.status) {
                    const tempBasketBillBreakdown = promoName ? [
                        { title: i18next.t('subTotal'), value: result.data.priceItemsSum },
                        { title: i18next.t('Promotion'), value: result.data.priceDiscountSum },
                        { title: `${i18next.t('deliveryCharges')} (`, deliverySum: result.data.priceDeliveriesSum.toLocaleString("nl-US", { minimumFractionDigits: 2 }), deliveryDays: `x ${result.data.countDeliveries} ${t("days")})`, value: result.data.priceDeliveriesSum },
                        { title: i18next.t('total'), value: result.data.priceTotalSum }]
                        : [
                            { title: i18next.t('subTotal'), value: result.data.priceItemsSum },
                            { title: `${i18next.t('deliveryCharges')} (`, deliverySum: result.data.priceDeliveriesSum.toLocaleString("nl-US", { minimumFractionDigits: 2 }), deliveryDays: `x ${result.data.countDeliveries} ${t("days")})`, value: result.data.priceDeliveriesSum },
                            { title: i18next.t('total'), value: result.data.priceTotalSum }]
                    const initialValue = 0;
                    const basketCount = result.data.deliveries.reduce(function (accumulator: number, curValue: any) {
                        const dayInitialValue = 0;
                        const dayBasketCount = curValue.items.reduce(function (dayBasketCountAccumulator: number, dayBasketCountAccumulatorCurValue: any) {
                            return dayBasketCountAccumulator + dayBasketCountAccumulatorCurValue.count
                        }, dayInitialValue)
                        return accumulator + dayBasketCount

                    }, initialValue)
                    if (result.data.countDeliveries === 0) {
                        store.dispatch(deletePromoCode())
                    } else {
                        dispatch({
                            type: types.BASKET_LIST,
                            basketList: result.data.deliveries,
                            basketCount: basketCount,
                            basketDeliverySum: result.data.priceDeliveriesSum,
                            basketPriceItemSum: result.data.priceItemsSum,
                            basketPriceTotalSum: result.data.priceTotalSum,
                            basketBillBreakdown: tempBasketBillBreakdown,
                            promoName: result.data.promoName,
                            promoUseId: result.data.promoUseId,
                            priceDiscountSum: result.data.priceDiscountSum,
                        })
                    }
                    if (payload.basketScreen) {
                        store.dispatch(fetchMenuList())
                    }
                    {
                        !payload.basketScreen &&
                            dispatch({
                                type: types.HANLDE_LOADER_ADD_REMOVE_BASKET,
                                isLoading: false
                            })
                    }

                }
            }
        ).catch(err => {
            dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
        })
    }
}

export const updateBasketQuantity = (payload: basketAction, basketScreen: boolean, successCallBack: any) => {
    const promoName = store.getState().basketReducer?.promoName?.length === 0 || store.getState().basketReducer?.promoName === undefined ? false : true;
    return async (dispatch: any) => {
        POST(`${Config().accesspoint}${endpoints.basketList}`, payload, {}).then(
            result => {
                if (result.status) {
                    const tempBasketBillBreakdown = promoName ? [
                        { title: i18next.t('subTotal'), value: result.data.priceItemsSum },
                        { title: i18next.t('Promotion'), value: result.data.priceDiscountSum },
                        { title: `${i18next.t('deliveryCharges')} (`, deliverySum: result.data.priceDeliveriesSum.toLocaleString("nl-US", { minimumFractionDigits: 2 }), deliveryDays: `x ${result.data.countDeliveries} ${t("days")})`, value: result.data.priceDeliveriesSum },
                        { title: i18next.t('total'), value: result.data.priceTotalSum }] : [
                        { title: i18next.t('subTotal'), value: result.data.priceItemsSum },
                        { title: `${i18next.t('deliveryCharges')} (`, deliverySum: result.data.priceDeliveriesSum.toLocaleString("nl-US", { minimumFractionDigits: 2 }), deliveryDays: `x ${result.data.countDeliveries} ${t("days")})`, value: result.data.priceDeliveriesSum },
                        { title: i18next.t('total'), value: result.data.priceTotalSum }]
                    const initialValue = 0;
                    const basketCount = result.data.deliveries.reduce(function (accumulator: number, curValue: any) {
                        const dayInitialValue = 0;
                        const dayBasketCount = curValue.items.reduce(function (dayBasketCountAccumulator: number, dayBasketCountAccumulatorCurValue: any) {
                            return dayBasketCountAccumulator + dayBasketCountAccumulatorCurValue.count
                        }, dayInitialValue)
                        return accumulator + dayBasketCount

                    }, initialValue)
                    if (result.data.countDeliveries === 0) {
                        store.dispatch(deletePromoCode())
                    } else {
                        dispatch({
                            type: types.BASKET_LIST,
                            basketList: result.data.deliveries,
                            basketCount: basketCount,
                            basketDeliverySum: result.data.priceDeliveriesSum,
                            basketPriceItemSum: result.data.priceItemsSum,
                            basketPriceTotalSum: result.data.priceTotalSum,
                            basketBillBreakdown: tempBasketBillBreakdown,
                            promoName: result.data.promoName,
                            promoUseId: result.data.promoUseId,
                            priceDiscountSum: result.data.priceDiscountSum,
                        })
                    }
                    if (basketScreen) {
                        store.dispatch(fetchMenuList())
                    }
                    {
                        !basketScreen &&
                            dispatch({
                                type: types.HANLDE_LOADER_ADD_REMOVE_BASKET,
                                isLoading: false
                            })
                    }
                    successCallBack(result.data.deliveries)
                }
            }
        ).catch(err => {
            dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
        })
    }
}

export const clearBasketDataOnLogout = () => {
    return async (dispatch: any) => {
        dispatch({
            type: types.CLEAR_BASKET_DATA_ON_LOGOUT
        })
    }
}

export const postPromoCode = (item: any, checkouts: boolean, errorCallback: any) => {
    const data = {
        promoName: item
    }
    return async (dispatch: any) => {
        POST(`${Config().accesspoint}${endpoints.promoCode}`, data, {}).then(
            result => {
                if (result.status) {
                    // dispatch(fetchBasketList(false, "", true))
                    const tempBasketBillBreakdown = [
                        { title: i18next.t('subTotal'), value: result.data.priceItemsSum },
                        { title: i18next.t('Promotion'), value: result.data.priceDiscountSum },
                        { title: `${i18next.t('deliveryCharges')} (`, deliverySum: result.data.priceDeliveriesSum.toLocaleString("nl-US", { minimumFractionDigits: 2 }), deliveryDays: `x ${result.data.countDeliveries} ${t("days")})`, value: result.data.priceDeliveriesSum },
                        { title: i18next.t('total'), value: result.data.priceTotalSum }]
                    const initialValue = 0;
                    const basketCount = result.data.deliveries.reduce(function (accumulator: number, curValue: any) {
                        const dayInitialValue = 0;
                        const dayBasketCount = curValue.items.reduce(function (dayBasketCountAccumulator: number, dayBasketCountAccumulatorCurValue: any) {
                            return dayBasketCountAccumulator + dayBasketCountAccumulatorCurValue.count
                        }, dayInitialValue)
                        return accumulator + dayBasketCount

                    }, initialValue)
                    dispatch({
                        type: types.BASKET_LIST,
                        basketList: result.data.deliveries,
                        basketCount: basketCount,
                        basketDeliverySum: result.data.priceDeliveriesSum,
                        basketPriceItemSum: result.data.priceItemsSum,
                        basketPriceTotalSum: result.data.priceTotalSum,
                        basketBillBreakdown: tempBasketBillBreakdown,
                        promoName: result.data.promoName,
                        promoUseId: result.data.promoUseId,
                        priceDiscountSum: result.data.priceDiscountSum,
                        priceTotalSumBeforeDiscount: result.data.priceTotalSumBeforeDiscount,
                        priceTotalSum: result.data.priceTotalSum,
                    })
                    dispatch({
                        type: types.COME_PROMO_CODE,
                        comeFromPromoCode: true
                    })
                    if (!checkouts) {
                        NavigationService.navigate(screens.basket.basket.name)
                    }
                }
            }
        ).catch(error => {
            errorCallback(error?.response?.data?.error_description)
            dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
        })
    }
}


export const deletePromoCode = () => {
    return async (dispatch: any) => {
        DELETE(`${Config().accesspoint}${endpoints.promoCode}`, {}).then(result => {
            if (result.status) {
                // dispatch(fetchBasketList(false, '', false))
                const tempBasketBillBreakdown = [
                    { title: i18next.t('subTotal'), value: result.data.priceItemsSum },
                    { title: `${i18next.t('deliveryCharges')} (`, deliverySum: result.data.priceDeliveriesSum.toLocaleString("nl-US", { minimumFractionDigits: 2 }), deliveryDays: `x ${result.data.countDeliveries} ${t("days")})`, value: result.data.priceDeliveriesSum },
                    { title: i18next.t('total'), value: result.data.priceTotalSum }]
                const initialValue = 0;
                const basketCount = result.data.deliveries.reduce(function (accumulator: number, curValue: any) {
                    const dayInitialValue = 0;
                    const dayBasketCount = curValue.items.reduce(function (dayBasketCountAccumulator: number, dayBasketCountAccumulatorCurValue: any) {
                        return dayBasketCountAccumulator + dayBasketCountAccumulatorCurValue.count
                    }, dayInitialValue)
                    return accumulator + dayBasketCount
                }, initialValue)
                dispatch({
                    type: types.BASKET_LIST,
                    basketList: result.data.deliveries,
                    basketCount: basketCount,
                    basketDeliverySum: result.data.priceDeliveriesSum,
                    basketPriceItemSum: result.data.priceItemsSum,
                    basketPriceTotalSum: result.data.priceTotalSum,
                    basketBillBreakdown: tempBasketBillBreakdown,
                    promoName: '',
                    promoUseId: '',
                })

            }
        }).catch(err => {
            console.log("storestore1", store.getState().menuReducer);

            dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
        })
    }
}