import {
    GET,
    endpoints
} from '@app/constants';
import Config from '@app/utils/config';
import types from "@app/screens/faqs/faqAction/types";
export const fetchFaqListData = () => {
    return async (dispatch: any) => {
        GET(`${Config().accesspoint}${endpoints.faqList}`, {}).then(
            result => {
                dispatch({
                    type: types.FAQ_LIST,
                    faqList: result.data
                })
            }
        ).catch(err => {
            dispatch({
                type: types.FAQ_LOADER,
                isLoading: false
            })
            console.log("err", err);
        })
    }
}
