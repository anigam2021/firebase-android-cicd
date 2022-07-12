import { t } from "i18next";
import { appConstants } from "@app/constants";
export function promoCodeValidation(item: any) {
    if (item.length === 0) {
        return `ⓘ ${t('pleaseEnterPromoCode')}`;
    }
    else if (!item.match(appConstants.PROMO_CODE_REGX)) {
        return `ⓘ ${t('Pleaseentervalideenterpromocode')}`;
    }
    else {
        return 1
    }
}