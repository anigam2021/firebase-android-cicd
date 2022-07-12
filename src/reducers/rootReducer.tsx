import { combineReducers } from "redux";
import AsyncStorage from '@react-native-community/async-storage';
import { authReducer } from "@app/screens/auth/authReducer/authReducer";
import { menuReducer } from "@app/screens/menu/menu/menuReducer";
import { basketReducer } from "@screen/basket/baseketReducer";
import { persistReducer } from 'redux-persist';
import { checkoutReducer } from "@app/screens/contact/contactReducer";
import { storeOrderNumberReducer } from "@app/screens/checkout/order/orderReducer";
import { fetchPastDeliveriesDataReducer, fetchUpComingDeliveriesDataReducer } from "@app/screens/my-deliveries/deleveriesReducer";
import { fetchOrderReceiptReducer } from "@app/screens/checkout/receipt/receiptReducer";
import { faqReducer } from "@app/screens/faqs/faqReducer/faqReducer";
import { termsConditionReducer } from "@app/screens/terms-conditions/termsConditionReducer/termsConditionReducer";
import { privacyPolicyReducer } from "@app/screens/privacy-policy/privacyPolicyReducer/privacyPolicyReducer";
import { contactUsReducer } from "@app/screens/contact-us/contactusReducer/contactusReducer";
const menuReducerConfig: any = {
    key: 'menuReducer',
    storage: AsyncStorage,
    blacklist: [
        "isLoading",
        "menuList",
        "selectedTimeSlot",
        "selectedDayDeliverySlots",
        "selectedDeliverySlotName",
        "selectedDayProducts",
        "selectedDateIndex",
        "selectedSlotIndex",
        "selectedMeal",
        "orderBefore"
    ]

};
const privacyPolicyReducerConfig: any = {
    key: 'privacyPolicyReducer',
    storage: AsyncStorage,
    blacklist: ["isLoading",

    ]


};
const basketReducerConfig: any = {
    key: 'basketReducer',
    storage: AsyncStorage,
    blacklist: ["isLoading",
        "basketList",
        "basketCount",
        "basketDeliverySum",
        "basketPriceItemSum",
        "basketPriceTotalSum",
        "basketBillBreakdown"]

};
const faqReducerConfig: any = {
    key: 'faqReducer',
    storage: AsyncStorage,
    blacklist: [
        "isLoading",]
};
const termsConditionReducerConfig: any = {
    key: 'termsConditionReducer',
    storage: AsyncStorage,
    blacklist: ["isLoading",

    ]

};

const checkoutReducerConfig: any = {
    key: 'checkoutReducer',
    storage: AsyncStorage,
    blacklist: [
        "isLoading",
        "checkoutData",
        // "name",
        "address",
        // "phone",
        "deliveryInstructions",
        "bankList",
        "selectedBank"
    ]
};
const storeOrderNumberReducerConfig: any = {
    key: 'storeOrderNumberReducer',
    storage: AsyncStorage,
    blacklist: [
        "isLoading",
        "orderNumber"
    ]
};

const fetchUpComingDeliveriesDataReducerConfig: any = {
    key: 'fetchUpComingDeliveriesDataReducer',
    storage: AsyncStorage,
    blacklist: [
        "isLoading",
        "upcomingDeliveriesData"
    ]
};

const fetchPastDeliveriesDataReducerConfig: any = {
    key: 'fetchPastDeliveriesDataReducer',
    storage: AsyncStorage,
    blacklist: [
        "isLoading",
        "fetchPastDeliveriesDataReducer"
    ]
};

const fetchOrderReceiptReducerConfig: any = {
    key: 'fetchOrderReceiptReducer',
    storage: AsyncStorage,
    blacklist: [
        "isLoading",
        "orderNumber",
        "receiptOrderData"
    ]
};
const contactUsReducerConfig: any = {
    key: 'contactUsReducer',
    storage: AsyncStorage,
    blacklist: [
        "isLoading",

    ]
};
const rootReducer = combineReducers({
    authReducer: authReducer,
    menuReducer: persistReducer(menuReducerConfig, menuReducer),
    basketReducer: persistReducer(basketReducerConfig, basketReducer),
    checkoutReducer: persistReducer(checkoutReducerConfig, checkoutReducer),
    storeOrderNumberReducer: persistReducer(storeOrderNumberReducerConfig, storeOrderNumberReducer),
    fetchUpComingDeliveriesDataReducer: persistReducer(fetchUpComingDeliveriesDataReducerConfig, fetchUpComingDeliveriesDataReducer),
    fetchPastDeliveriesDataReducer: persistReducer(fetchPastDeliveriesDataReducerConfig, fetchPastDeliveriesDataReducer),
    fetchOrderReceiptReducer: persistReducer(fetchOrderReceiptReducerConfig, fetchOrderReceiptReducer),
    faqReducer: persistReducer(faqReducerConfig, faqReducer),
    termsConditionReducer: persistReducer(termsConditionReducerConfig, termsConditionReducer),
    privacyPolicyReducer: persistReducer(privacyPolicyReducerConfig, privacyPolicyReducer),
    contactUsReducer: persistReducer(contactUsReducerConfig, contactUsReducer),

});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;