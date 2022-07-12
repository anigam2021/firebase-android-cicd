import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StatusBar,
    ScrollView,
    ActivityIndicator
} from 'react-native';

import {
    PrimaryHeader,
    PrimaryButton,
    OTPTextView
} from '@app/components';
import { colors,screens,firebase } from '@app/constants';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { onSignInWithEmail, sendMailSignInLink } from '@app/screens/auth/authAction/authAction';
import types from '@screen/auth/authAction/types';
import { useTranslation } from 'react-i18next';
import utils from '@app/utils';
import Toast from 'react-native-simple-toast';
import {  setCurrentScreen, logEvent, onSignIn } from "@app/utils/firebase";

const VerifyOtp = (props: any) => {
    const { t } = useTranslation();
    const [otp, setOtp] = useState<string>("")
    const [timer, setTimer] = useState<any>(0)
    const [isInValid, setIsInValid] = useState<boolean>(true)
    const [showResend, setShowResend] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>(t('invalid'))
    const [randomKey, setRandomKey] = useState<string>("")
    const dispatch = useDispatch()
    const { challengeId } = useSelector((state: { authReducer: any }) => ({
        challengeId: state.authReducer.challengeId,
    }));

    useEffect(() => {
        setIsInValid(true)
        setOtp(props.route.params?.otp)
        setRandomKey(JSON.stringify((Math.random() * 10000) + 1))
    }, [props.route.params])

    useEffect(
        () => {
            setCurrentScreen(screens.auth.verifyOtp.name, screens.auth.verifyOtp.title)
            if (timer < 1) {
                setShowResend(true)
                return;
            }
            const id = setInterval(() => {
                setTimer(timer - 1)
            }, 1000);
            return () => clearInterval(id);
        }, []
    [timer]
    );


    const handleResend = () => {
        setIsLoading(false)
        setIsInValid(true)
        setTimer(59)
        setShowResend(false)
        toResendSignInLink()
        setOtp("")
    }

    const toResendSignInLink = () => {
        let LogEvent = {
            email:props.route.params.email,
            eventType: firebase.analtyics.ANALYTICS_TYPE_ACTION,
            eventMessage: "User resend OTP request"
        }
        logEvent(firebase.analtyics.ANALYTICS_VERIFY_RESEND, LogEvent)
        const data = {
            challengeId: challengeId,
            email: props.route.params.email
        }

        dispatch(sendMailSignInLink('', data, (response: any) => {
            handleResendMailLinkSuccess(response)
        }, (error: any) => { handleResendMailLinkError(error) }))
        
    }
    const handleResendMailLinkSuccess = (response: any) => {
        // commonFunction.showSnackbar(t("otpResentSuccessfully"))
        Toast.showWithGravity(t("otpResentSuccessfully", { email: props.route.params.email }), Toast.SHORT, Toast.TOP);
        //Here success handling will be done in future, for now overriding intentionally
    }
    const handleResendMailLinkError = (error: any) => {
        //Here error handling will be done in future, for now overriding intentionally
    }
    const handleVerify = () => {
        let LogEvent = {
            email: props.route.params.email,
            eventType: firebase.analtyics.ANALYTICS_TYPE_ACTION,
            eventMessage: "User request OTP verify"
        }
        logEvent(firebase.analtyics.ANALYTICS_VERIFY_OTP_REQUEST, LogEvent)
        if (otp.length === 6) {
            toSignInWithEmailLink()
        }
        else {
            setIsInValid(false)
            setErrorMessage(t('emptyMessage'))
        }
    }

    const toSignInWithEmailLink = () => {
        setIsLoading(true)
        const data = {
            challengeId: challengeId,
            email: props.route.params.email,
            pinOrOobCode: otp
        }
        dispatch(onSignInWithEmail('', data, (response: any) => { handleSignInEmailSuccess(response) }, (error: any) => { handleSignInEmailError(error) }))
    }

    const handleSignInEmailSuccess = (response: any) => {
        onSignIn(response.data.userId, props.route.params.email)
        setIsLoading(false)
        setIsInValid(false)
        setTimer(0)
        utils.commonFunctions.setAuthorizationToken(response.data.accessToken)
        //now setting user details in auth.
        dispatch({
            type: types.USER_DETAILS,
            userDetails: {
                userId: response.data.userId,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                userPresent: true,
            }
        })
        let LogEvent = {
            email: props.route.params.email,
            eventType: firebase.analtyics.ANALYTICS_TYPE_PROCESS,
            eventMessage: "User OTP verify verify successfully"
        }
        logEvent(firebase.analtyics.ANALYTICS_VERIFY_OTP_SUCCESSFULL, LogEvent)
    }
    const handleSignInEmailError = (error: any) => {
        setTimer(0)
        setIsLoading(false)
        setIsInValid(false)
        setErrorMessage(t('invalid'))
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={styles.dataContainer}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps="handled">

                    <PrimaryHeader
                        left="arrowleft"
                        iconSize={24}
                        iconColor={colors.blackColor}
                        leftPress={() => props.navigation.goBack()}
                        leftIconWrapperStyle={styles.headerLeftWrapper}
                    />

                    <View style={styles.verifyAccountTextContainer}>
                        <Text style={styles.verifyYourAccountText}>{t("verifyyourAccount")}</Text>
                        <Text style={styles.weSentVerificationCodeText}>{t("weSentAVerificationCodeToYourEmail", { email: props.route.params.email })}</Text>
                    </View>
                    <View style={styles.otpContainer}>
                        <OTPTextView
                            inputCount={6}
                            timer={timer < 10 ? `00:0${timer}` : `00:${timer}`}
                            resendText={timer === 0 ? t("resend") : `${t("resend")} (${t("wait")} ${timer < 10 ? `0${timer}s` : `${timer}s`})`}
                            inputTextColor={isInValid ? colors.color_1F094D : colors.color_C81B1B}
                            dividerColor={isInValid ? colors.color_1F094D : colors.color_C81B1B}
                            handleResendOtp={() => { timer > 0 ? null : handleResend() }}
                            showResend={showResend}
                            isInvalid={!isInValid}
                            handleTextChange={(otpValue: string) => {
                                setIsInValid(true)
                                setOtp(otpValue)
                            }}
                            errorMessage={errorMessage}
                            onSubmitEditing={() => { handleVerify() }}
                            keyboardType={"numeric"}
                            returnKeyType={"done"}
                            returnKeyLabel={"done"}
                            autoFocus={true}
                            resendActiveOpacity={timer > 0 ? 1 : 0.8}
                            key={randomKey}
                            defaultValue={otp}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        {isLoading ?
                            <View style={styles.indicatorWrapper}>
                                <ActivityIndicator color={colors.color_135B2C} size="large" />
                            </View> :
                            <PrimaryButton
                                title={t("verify")}
                                onPress={() => { handleVerify() }}
                                touchablestyle={styles.buttonStyle}
                                textstyle={styles.buttonTextStyle}
                            />
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default VerifyOtp;