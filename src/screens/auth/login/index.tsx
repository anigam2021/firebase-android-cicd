import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StatusBar,
    ActivityIndicator,
    Platform,
    Animated,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import * as EmailValidator from 'email-validator';
import { styles } from './styles';
import { screens, vh, colors, firebase } from '@app/constants';
import {
    PrimaryInput,
    PrimaryButton
} from '@app/components';
import * as NavigationService from '@app/navigations/navigation-service';
import { useDispatch, useSelector } from 'react-redux';
import { getChallengeId, sendMailSignInLink } from '@app/screens/auth/authAction/authAction';
import types from '@screen/auth/authAction/types';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/core';
import utils from '@app/utils';
import { getImageFromURL, IMAGES } from '@app/constants/images';
import {  setCurrentScreen, logEvent } from "@app/utils/firebase";

const Login = (props: any) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [isEmailError, setIsEmailError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const viewBottom = useRef(new Animated.Value(vh(60))).current;
    const decreaseViewBottom = () => {
        Keyboard.dismiss()
        Animated.timing(viewBottom, {
            toValue: vh(60),
            duration: 400,
            useNativeDriver: false
        }).start()
    }
    const dispatch = useDispatch()
    const { challengeId } = useSelector((state: { authReducer: any }) => ({
        challengeId: state.authReducer.challengeId,
        language: state.authReducer.language,
    }));
    const isFoucused = useIsFocused()
    const handleContinue = () => {//async
        Keyboard.dismiss()
        if (email === "") {
            setEmailError(`ⓘ ${t("pleaseEnterEmail")}`)
            setIsEmailError(true)
            return;
        }
        if (!EmailValidator.validate(email)) {
            setEmailError(`ⓘ ${t("invalidEmail")}`)
            setIsEmailError(true)
            return;
        }
        setEmailError("")
        setIsEmailError(false)
        toSendMailSignInLink()
        let LogEvent = {
            email,
            eventType: firebase.analtyics.ANALYTICS_LOGIN_CONTINUE,
            eventMessage: "User login request"
        }
        logEvent(firebase.analtyics.ANALYTICS_LOGIN_CONTINUE, LogEvent)
    }

    const toSendMailSignInLink = () => {
        setIsLoading(true)
        const data = {
            challengeId: challengeId,
            email: email
        }
        dispatch(sendMailSignInLink('', data, (response: any) => { handleSendMailLinkSuccess(response) }, (error: any) => {
            handleSendMailLinkError(error)
        }))
    }
    const handleSendMailLinkSuccess = (response: any) => {
        setIsLoading(false)
        dispatch({
            type: types.STORE_EMAIL,
            email: email
        })
        NavigationService.navigate(screens.auth.verifyOtp.name, { email: email, otp: "" })
    }

    const handleSendMailLinkError = (error: any) => {
        setIsLoading(false)
    }

    const toGetChallengeId = () => {
        //Getting the challenge id for subsequent api.
        dispatch(getChallengeId('', '', (response: any) => { handleGetChallengeIdSuccess(response) },
            (error: any) => { handleGetChallengeIdError(error) }))
    }
    const handleGetChallengeIdSuccess = (response: any) => {
        //Setting the challenge id in redux.
        dispatch({
            type: types.CHALLENGE_ID,
            challengeId: response.data.challengeId
        })
    }
    const handleGetChallengeIdError = (error: any) => {
        //Here error handling will be done in future, for now overriding intentionally
    }
    function onKeyboardDidShow(e: any) {
        //e.endCoordinates.height
        Animated.timing(viewBottom, {
            toValue: Platform.OS === 'ios' ? vh(e.endCoordinates.height + 60) : vh(60),
            duration: 300,
            useNativeDriver: false
        }).start()
    }
    function onKeyboardDidHide() {
        Keyboard.dismiss()
        decreaseViewBottom()
    }
    useEffect(() => {
        setCurrentScreen(screens.auth.login.name, screens.auth.login.title)
        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        utils.commonFunctions.setAuthorizationToken('', true)
        if (isFoucused) {
            toGetChallengeId()
        }
        return () => {
            showSubscription.remove();
            hideSubscription.remove()
        };
    }, [isFoucused])

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => { decreaseViewBottom() }}
                >
                    <Animated.View
                        animation={"slideInUp"}
                        iterationCount={1}
                        style={[styles.dataContainer, {
                            bottom: viewBottom,
                        }]}>
                        <View style={styles.eatchLogoContainer}>
                            <Image
                                source={getImageFromURL(IMAGES.EATCH_LOGO)}
                                style={{ height: vh(55) }}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.splashMainImageContainer}>
                            <Image source={getImageFromURL(IMAGES.SPLASH)}
                                style={styles.splashImage}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.welcomeTextContainer}>
                            <Text style={styles.welcomeText}>{t("welcomeBack")}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <PrimaryInput
                                placeholder={t("enterYourEmailAddress")}
                                value={email}
                                onChangeText={(text: string) => {
                                    setEmailError("")
                                    setIsEmailError(false)
                                    setEmail(text)
                                }}
                                keyboardType="email-address"
                                errorMsg={emailError}
                                isError={isEmailError}
                                maxLength={50}
                                placeholderTextColor={colors.color_A0A0A0}
                                textInputStyle={styles.textInputStyle}
                                onSubmitEditing={() => { handleContinue() }}
                                returnKeyType={"send"}
                                returnKeyLabel={"send"}
                                editable={!isLoading}
                                autoCapitalize = 'none'
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            {
                                isLoading ?
                                    <View style={styles.indicatorWrapper}>
                                        <ActivityIndicator color={colors.color_135B2C} size="large" />
                                    </View>
                                    :
                                    <PrimaryButton
                                        title={t("continue")}
                                        onPress={() => { handleContinue() }}
                                        touchablestyle={styles.buttonStyle}
                                        textstyle={styles.buttonTextStyle}
                                    />
                            }
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </SafeAreaView >
        </>
    )
}

export default Login;