import { IMAGES } from "@app/constants/images";
import { t } from 'i18next';

export declare type Data = {
    id: number;
    title: string;
    imageName: any;
}[];
export const data: Data = [
    {
        id: 0,
        title: `${t('MyDeliveries')}`,
        imageName: IMAGES.MYORDER_ICON,
    },
    {
        id: 1,
        title: `${t('AccountSettings')}`,
        imageName: IMAGES.SETTING_ICON,
    },
    {
        id: 3,
        title: `${t('Language')}`,
        imageName: IMAGES.LANGUAGE_ICON
    },
    {
        id: 4,
        title: `${t('FAQ')}`,
        imageName: IMAGES.MESSAGE_ICON
    },
    {
        id: 5,
        title: `${t('Contactus')}`,
        imageName: IMAGES.CONTACT_ICON
    },
    {
        id: 6,
        title: `${t('Termsandconditions')}`,
        imageName: IMAGES.SECURITY_SAFE_ICON
    },
    {
        id: 7,
        title: `${t('Privacypolicy')}`,
        imageName: IMAGES.SECURITY_SAFE_ICON
    },
    {
        id: 8,
        title: `${t('logout')}`,
        imageName: IMAGES.LOGOUT_ICON
    },
]
