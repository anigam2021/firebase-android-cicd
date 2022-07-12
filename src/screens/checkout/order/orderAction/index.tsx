import { colors, DELETE, endpoints, POST, screens } from "@app/constants";
import Config from '@app/utils/config';
import store from "@app/store";
import types from "@app/screens/checkout/order/orderAction/types";
import menuTypes from "@app/screens/menu/menu/menuAction/types";
import basketTypes from '@app/screens/basket/basketAction/types'
import * as NavigationService from "@navigation/navigation-service";
import { Linking } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export const placeOrder = () => {
    const promoUseId = store.getState().basketReducer?.promoUseId;
    return async (dispatch: any) => {
        dispatch({
            type: types.HANDLE_LOADER,
            isLoading: true
        })
        const tempBasketList = JSON.parse(JSON.stringify(store.getState().basketReducer.basketList));
        tempBasketList.map((item: any, index: number) => {
            delete item.deliverySlots;
            delete item.priceDelivery;
            delete item.priceItemsSum;
            item.items.map((items: any, indexNumber: number) => {
                delete items.totalPrice;
                delete items.count;
                delete items.product.name;
                delete items.product.summary;
                delete items.product.listingPicture;
                delete items.product.htmlIngredients;
                delete items.product.variants;
                items.variants.map((variants: any, indexNumberForVariants: number) => {
                    delete variants.totalPrice;
                    delete variants.variantPrice;
                })
            })
        })
        const priceTotalSum = store.getState().basketReducer.basketPriceTotalSum;
        const data: any = {
            "deliveries": tempBasketList,
            "priceTotalSum": priceTotalSum,
            "paymentMethod": "ideal",
            "paymentParameters": {
                "issuer": store.getState().checkoutReducer.selectedBank.id
            },
            "promoUseId": promoUseId
        };
        POST(`${Config().accesspoint}${endpoints.placeOrder}`, data, {}).then(
            result => {
                if (result.status) {
                    dispatch({
                        type: types.HANDLE_LOADER,
                        isLoading: false
                    })
                    openPaymentLink(result.data.doNext.redirectUrl)
                }
            }
        ).catch(err => {
            dispatch({
                type: types.HANDLE_LOADER,
                isLoading: false
            })
        })
    }
}

export const openPaymentLink = async (url: string) => {
    try {
        if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: colors.color_1B463C,
                preferredControlTintColor: colors.whiteColor,
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: colors.color_1B463C,
                secondaryToolbarColor: colors.blackColor,
                navigationBarColor: colors.blackColor,
                navigationBarDividerColor: colors.whiteColor,
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
            })
            console.log("result from browser", result);
            if (result && result.type === "cancel") {
                store.dispatch(updatePaymentStatus("pending"))
            }
        }
        else Linking.openURL(url)
    } catch (error: any) {
        // Alert.alert(error?.message)
    }
}

export const updatePaymentStatus = (status: string) => {
    return async (dispatch: any) => {
        dispatch({
            type: types.HANDLE_PAYMENT_STATUS,
            paymentStatus: status
        })
        if (status && status === "success") {
            DELETE(`${Config().accesspoint}${endpoints.basketList}`, {}).then(result => {
                //without telling user basketlist is being emptied
            }).catch(err => {
                console.log("err", err);
            })
            dispatch({
                type: basketTypes.CLEAR_BASKET_DATA_ON_LOGOUT
            })
            dispatch({
                type: menuTypes.RESET_MENU_DATA_AFTER_PLACE_ORDER,
                isLoading: true,
            })
        }
        else if (status && status !== "success") {
            NavigationService.navigate(screens.checkout.checkout.name, null)
        }
    }
}