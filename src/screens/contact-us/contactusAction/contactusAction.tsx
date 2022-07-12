import {
    GET,
    endpoints
} from '@app/constants';
import Config from '@app/utils/config';
import types from '@app/screens/contact-us/contactusAction/types';

export const fetchContactUsData = () => {
    return async (dispatch: any) => {
        GET(`${Config().accesspoint}${endpoints.contactUs}`, {}).then(
            result => {
                dispatch({
                    type: types.CONTACT_US,
                    email: result.data
                })
            }
        ).catch(err => {
            console.log("err", err);
        })
    }
}
