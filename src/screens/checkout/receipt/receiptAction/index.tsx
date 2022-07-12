import {
    GET,
    endpoints,
    screens
} from '@app/constants';
import Config from '@app/utils/config';
import types from './types';
import typeLoading from '@app/screens/my-deliveries/deliveriesActions/types';
import * as NavigationService from "@navigation/navigation-service";

export const fetchOrderReceipt = (orderNumber: string, orderSuccess: string) => {
    return async (dispatch: any) => {
        dispatch({
            type: typeLoading.HANDLE_LOADER,
            isLoading: true
        })
        GET(`${Config().accesspoint}${endpoints.orderReceipt}/${orderNumber}`, {}).then(
            (result) => {
                dispatch({
                    type: types.RECEIPT_DATA,
                    orderNumber: orderNumber,
                    receiptOrderData: result.data,
                })
                dispatch({
                    type: typeLoading.HANDLE_LOADER,
                    isLoading: false
                })
                NavigationService.navigate(screens.receipt.receipt.name, { "orderNumber": orderNumber, "orderSuccess": orderSuccess })
            }).catch(error => {
                dispatch({
                    type: typeLoading.HANDLE_LOADER,
                    isLoading: true
                })
            })

    }
}