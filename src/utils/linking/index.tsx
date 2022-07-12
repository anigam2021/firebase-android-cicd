import { updatePaymentStatus } from "@screen/checkout/order/orderAction";
import store from "@app/store";
import { fetchOrderReceipt } from '@app/screens/checkout/receipt/receiptAction';
import commonFunction from "@app/utils/common-function";
import i18next from 'i18next';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import * as NavigationService from '@app/navigations/navigation-service';
import { screens } from "@app/constants";
import types from "@app/screens/auth/authAction/types";

export const openURL = (url: string) => {
    if (store.getState().authReducer.userPresent) {
        InAppBrowser.close()
        const splitURL = url.split("/")
        const status = splitURL[4] ? splitURL[4] : ""
        console.log("status", status);
        switch (status) {
            case "failed":
                store.dispatch(updatePaymentStatus("failed"))
                break;

            case "success":
                store.dispatch(updatePaymentStatus("success"))
                store.dispatch(fetchOrderReceipt(splitURL[splitURL.length - 1], "success"))
                break;

            case "rejected":
                store.dispatch(updatePaymentStatus("rejected"))
                break;

            case "cancelled":
                store.dispatch(updatePaymentStatus("cancel"))
                break;

            case "pending":
                store.dispatch(updatePaymentStatus("pending"))
                break;

            default:
                commonFunction.showSnackbar(i18next.t("invalidURL"))
        }
    }
    else {
        InAppBrowser.close()
        const splitURL = url.split("/")
        const splitURLForLogin = splitURL[3].split("?")
        const status = splitURLForLogin[0] ? splitURLForLogin[0] : ""
        const splitURLSecond = splitURLForLogin[1].split("=")
        const splitYRLForOTP = splitURLSecond[1].split("&")
        const otp = splitYRLForOTP[0]
        const emailForLogin = store.getState().authReducer?.loginEmail;
        switch (status) {
            case "login":
                NavigationService.navigate(screens.auth.verifyOtp.name,
                    {
                        email: emailForLogin,
                        otp: otp,
                    })
                break;
            default:
                commonFunction.showSnackbar(i18next.t("invalidURL"))
        }
    }
}