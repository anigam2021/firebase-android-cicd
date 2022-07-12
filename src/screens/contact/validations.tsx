import { t } from 'i18next';
import * as EmailValidator from 'email-validator';
import { appConstants } from "@app/constants";
export function fullNameValidations(item: any) {
    if (item.length === 0) {
        return `ⓘ ${t('PleaseEnterFullName')}`;
    } else if (item.length < 3) {
        return `ⓘ ${t('pleaseEnterFullNameGreaterThan2')}`;
    }
    else if (!item.match(appConstants.FULL_NAME_REGX)) {
        return `ⓘ ${t('pleaseEnterValidName')}`;
    }
    else {
        return 1
    }
}
export function phoneNumberValidations(item: any) {
    if (item.length === 0) {
        return `ⓘ ${t('PleaseEnterPhoneNumber')}`;
    } else if (item.length < 10) {
        return `ⓘ ${t('pleaseEnterPhoneNumberGreaterThan10')}`;
    }
    else if (!item.match(appConstants.PHONE_NUMBER_REGX)) {
        return `ⓘ ${t('pleaseEnterValidPhoneNumber')}`;
    }
    else {
        return 1
    }
}

export function streetValidations(item: any) {
    if (item.length === 0) {
        return `ⓘ ${t('pleaseEnterStreetName')}`;
    }
    else if (item.length < 3) {
        return `ⓘ ${t('pleaseEnterStreetNameGreaterThan6')}`;
    }
    else if (!item.match(appConstants.STREET_NAME_REGX)) {
        return `ⓘ ${t('pleaseEnterValidStreetName')}`;
    }
    else {
        return 1
    }
}
export function houseNumberValidations(item: any) {
    if (item.length === 0) {
        return `ⓘ ${t('pleaseEnterHouseNumber')}`;
    }
    // else if (item.length < 1) {
    //     return `ⓘ ${t('pleaseEnterHouseNumberGreaterThan2')}`;
    // }
    else if (!item.match(appConstants.HOUSE_NUMBER_REGXFIRSTTEXT)) {
        return `ⓘ ${t('HouseNumberShouldStartWithDigit')}`;
    } else if (!item.match(appConstants.HOUSE_NUMBER_REGX)) {
        return `ⓘ ${t('pleaseEnterValidHouseNumber')}`;
    }
    else {
        return 1
    }
}
export function postalCodeValidations(item: any) {
    if (item.length === 0) {
        return `ⓘ ${t('pleaseEnterPostalCode')}`;
    } else if (item.length < 2) {
        return `ⓘ ${t('pleaseEnterPostalNumberGreaterThan2')}`;
    } else if (!item.match(appConstants.POSTAL_NUMBER_REGX)) {
        return `ⓘ ${t('pleaseEnterValidPostalNumber')}`;
    }
    else {
        return 1
    }
}

export function deliveryInstructionValidations(item: any) {
    return 1;
}
export function emailAddressValidation(item: any) {
    if (item.length === 0) {
        return `ⓘ ${t('pleaseEnterEmail')}`;
    }
    else if (!EmailValidator.validate(item)) {
        return `ⓘ ${t("invalidEmail")}`
    }
    else {
        return 1
    }
}