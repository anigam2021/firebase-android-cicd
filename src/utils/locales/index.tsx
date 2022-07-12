import { NativeModules, Platform } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import store from '@app/store'

import en from './en';
import nl from './nl';

const resources = {
    en: { translation: en },
    nl: { translation: nl },
};

export const i18nInitialise = () => {
    const deviceLanguage = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    const checkDeviceLang = () => {
        if (deviceLanguage.includes("nl")) {
            return "nl"
        }
        //Here we can give condition for any of the language.
        else {
            return "en"
        }
    }

    const lng = store.getState().authReducer.language
        ? store.getState().authReducer.language
        : checkDeviceLang()



    return (
        i18n
            .use(initReactI18next)
            .init({
                compatibilityJSON: 'v3',
                fallbackLng: 'en',
                debug: true,
                resources,
                lng,
            })
    );
};


