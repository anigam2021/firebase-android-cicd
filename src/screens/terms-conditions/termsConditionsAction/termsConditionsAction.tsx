import {
    GET,
    endpoints
} from '@app/constants';
import Config from '@app/utils/config';
import types from "./types";

export const fetchTermsConditionViewData = () => {
    return async (dispatch: any) => {
        GET(`${Config().accesspoint}${endpoints.termsCondition}`, {}).then(
            result => {
                dispatch({
                    type: types.TERMS_CONDITION_VIEW,
                    termsConditionView: result.data
                })
            }
        ).catch(err => {
            console.log("err", err);
        })
    }
}
