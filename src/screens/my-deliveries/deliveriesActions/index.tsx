import {
    GET,
    endpoints,
} from '@app/constants';
import Config from '@app/utils/config';
import types from './types';

export const fetchUpcomingData = () => {
    return async (dispatch: any) => {
        dispatch({
            type: types.HANDLE_LOADER,
            isLoading: true
        })
        GET(`${Config().accesspoint}${endpoints.upcomingDelivery}`, {}).then(
            (result) => {
                dispatch({
                    type: types.UPCOMING_DELIVERY_LIST,
                    upcomingDeliveriesData: result.data.deliveries,
                })
                dispatch({
                    type: types.HANDLE_LOADER,
                    isLoading: false
                })
            }).catch(error => {
                dispatch({
                    type: types.HANDLE_LOADER,
                    isLoading: true
                })
            })

    }
}

export const fetchPastData = () => {
    return async (dispatch: any) => {
        dispatch({
            type: types.HANDLE_LOADER,
            isLoading: true
        })
        GET(`${Config().accesspoint}${endpoints.pastDelivery}`, {}).then(
            (result) => {
                dispatch({
                    type: types.PAST_DELIVERY_LIST,
                    pastDeliveriesData: result.data.deliveries,
                })
                dispatch({
                    type: types.HANDLE_LOADER,
                    isLoading: false
                })
            }).catch(error => {
                dispatch({
                    type: types.HANDLE_LOADER,
                    isLoading: true
                })
            })

    }
}