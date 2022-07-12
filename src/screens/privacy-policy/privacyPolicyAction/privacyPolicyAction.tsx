import {
    GET,
    endpoints
} from '@app/constants';
import Config from '@app/utils/config';
import types from './types';

export const privacyPolicyView = () => {
    return async (dispatch: any) => {
        GET(`${Config().accesspoint}${endpoints.privacyPolicy}`, {}).then(
            result => {
                console.log(result,)

                dispatch({
                    type: types.PRIVACY_POLICY_VIEW,
                    privacyPolicyView: result.data

                })



            }
        ).catch(err => {
            console.log("err", err);


        })
    }
}
