import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import rootReducer from "../reducers";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';

const enhancer = compose(applyMiddleware(thunk, logger));
const persistConfig: any = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [
        "menuReducer",
        "basketReducer",
        "checkoutReducer",
        "contactUsReducer",
        "privacyPolicyReducer",
        "termsConditionReducer",
        "faqReducer",
        "fetchOrderReceiptReducer",
        "fetchPastDeliveriesDataReducer",
        "fetchUpComingDeliveriesDataReducer",
        "storeOrderNumberReducer"
    ]

};
const storeReducer: any = persistReducer(
    persistConfig,
    rootReducer,
);

const store: any = createStore(storeReducer, enhancer);
export const persistor: any = persistStore(store);
export default store;