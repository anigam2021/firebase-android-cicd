import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, NativeModules, Platform } from 'react-native';
import React, { useState } from 'react';
import { PrimaryButton, PrimaryHeader } from '@app/components';
import { t } from 'i18next';
import { appConstants, colors, fonts, vw } from '@app/constants';
import { styles } from './style';
import { connect, useDispatch } from 'react-redux';
import { language } from '@app/screens/auth/authAction/authAction';
import { LanguageProps } from '@app/utils/interface/index';
const Language = (props: LanguageProps) => {
    const dispatch = useDispatch()
    const deviceLanguage = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    const [state, setState] = useState({
        nederlandLang: props.authReducer ? props.authReducer === 'nl' : deviceLanguage.includes('nl'),
        englishLang: props.authReducer ? props.authReducer === 'en' : deviceLanguage.includes('en'),
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onPressLeftIcon = () => {
        props.navigation.goBack()
    }
    const LanguageChange = () => {
        if (state.englishLang && !state.nederlandLang) {
            dispatch(language("en"))
            setTimeout(() => {
                setIsLoading(false)
            }, 800);
        }
        else if (!state.englishLang && state.nederlandLang) {
            dispatch(language("nl"))
            setTimeout(() => {
                setIsLoading(false)
            }, 800);
        }
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <PrimaryHeader
                    iconSize={vw(22)}
                    iconColor={colors.blackColor}
                    left={"left"}
                    title={t('Language')}
                    mainContainer={styles.headerMainContainer}
                    titleStyle={styles.headerTitleStyle}
                    leftPress={() => onPressLeftIcon()}
                />
                <TouchableOpacity
                    style={styles.languageBtn}
                    onPress={() => {
                        isLoading === false && setState({
                            ...state,
                            nederlandLang: true,
                            englishLang: false,
                        })

                    }}
                    activeOpacity={appConstants.ACTIVE_OPACITY}
                >
                    <Text
                        style={[styles.languageText,
                        {
                            fontFamily: state.nederlandLang && !state.englishLang ?
                                fonts.poppinsSemiBold
                                :
                                fonts.poppinsRegular
                        }]}
                    >
                        {`${t('Nederlands')}`}
                    </Text>
                    <View style={styles.radioBtn}  >
                        {

                            (state.nederlandLang && !state.englishLang) || (props.authReducer === state.nederlandLang) ?
                                <View style={styles.selectedLanguage} />
                                :
                                null
                        }
                    </View>
                </TouchableOpacity>
                <View
                    style={styles.separatorView}
                />
                <TouchableOpacity style={[styles.languageBtn, { marginTop: 0 }]}
                    onPress={() => {
                        isLoading === false &&
                            setState({
                                ...state,
                                nederlandLang: false,
                                englishLang: true,
                            })

                    }
                    }
                    activeOpacity={appConstants.ACTIVE_OPACITY}
                >

                    <Text style={[styles.languageText,
                    {
                        fontFamily: !state.nederlandLang && state.englishLang ?
                            fonts.poppinsSemiBold
                            :
                            fonts.poppinsRegular
                    }]}
                    >
                        {`${t("English")}`}
                    </Text>
                    <View style={styles.radioBtn}>
                        {
                            (!state.nederlandLang && state.englishLang) || (props.authReducer === state.englishLang) ?
                                <View style={styles.selectedLanguage} />
                                :
                                null
                        }
                    </View>
                </TouchableOpacity>
                <View
                    style={styles.separatorView}
                />
                <View style={styles.saveBtn}>
                    <PrimaryButton
                        title={t("Save")}
                        onPress={() => { setIsLoading(true); LanguageChange() }}
                        touchablestyle={styles.buttonStyle}
                        textstyle={styles.buttonTextStyle}
                        isLoading={isLoading}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}
function mapStateToProps(state: any) {
    const { authReducer } = state
    return {
        authReducer: authReducer?.language
    }
}
export default connect(mapStateToProps, null)(Language)