import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, Platform, SafeAreaView, StatusBar, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import {
    PrimaryButton,
    PrimaryHeader, PrimaryInput
} from "@app/components";
import { vh, vw, colors, } from "@app/constants";
import { t } from 'i18next';
import { styles } from './style';
import { connect, useDispatch } from 'react-redux';

import { emailAddressValidation, fullNameValidations, phoneNumberValidations } from '@app/screens/contact/validations';
import { postName, postNumber } from '@app/screens/contact/contactAction/checkoutAction';

const AccountSetting = (props: any) => {
    const dispatch = useDispatch()
    const emailAddressRef = useRef<TextInput>();
    const phoneNumberRef = useRef<TextInput>();
    const fullNameRef = useRef<TextInput>();
    const [emailAddress, setEmailAddress] = useState<string>(props.authReducer?.email?.email)
    const [isemailAddressError, setIsEmailAddressError] = useState<boolean>(false)
    const [fullName, setFullName] = useState<string>(props.checkoutReducer.name ? props.checkoutReducer?.name : "")
    const [isfullNameError, setIsFullNameError] = useState<boolean>(false)
    const [phoneNumber, setPhoneNumber] = useState<string>(props.checkoutReducer.phone ? props.checkoutReducer?.phone : "")
    const [isPhoneNumberError, setIsPhoneNumberError] = useState<boolean>(false)
    const [fullNameError, setFullNameError] = useState<string>('')
    const [emailAddressError, setEmailAddressError] = useState<string>('')
    const [phoneNumberError, setPhoneNumberError] = useState<string>('')
    const [isShowTitleForName, setIsShowTitleForName] = useState<boolean>(false)
    const [isShowTitleForPhone, setIsShowTitleForPhone] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const viewBottom = useRef(new Animated.Value(vh(70))).current;
    const decreaseViewBottom = () => {
        Keyboard.dismiss()
        Animated.timing(viewBottom, {
            toValue: vh(70),
            duration: 400,
            useNativeDriver: false
        }).start()
    }
    function onKeyboardDidShow(e: keyboard) {
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
        setLoading(false)
        if (!!props.checkoutReducer?.name) {
            setIsShowTitleForName(true);
        }
        if (!!props.checkoutReducer?.phone) {
            setIsShowTitleForPhone(true)
        }
        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])
    const handleContinue = () => {
        Keyboard.dismiss()
        if (fullNameValidations(fullName) === 1
            && phoneNumberValidations(phoneNumber) === 1
            && emailAddressValidation(emailAddress) === 1) {
            setIsEmailAddressError(false)
            setIsFullNameError(false)
            setIsPhoneNumberError(false)
            if (props.checkoutReducer?.name === null && props.checkoutReducer?.phone === null) {
                dispatch(postName(fullName, phoneNumber, true, true))
            }
            else {
                if (fullName === props.checkoutReducer?.name && phoneNumber === props.checkoutReducer?.phone) {
                    setLoading(false);
                    props.navigation.goBack()
                }
                else {
                    fullName !== props.checkoutReducer.name && phoneNumber !== props.checkoutReducer.phone && dispatch(postName(fullName, phoneNumber, true, true));
                    fullName !== props.checkoutReducer.name && phoneNumber === props.checkoutReducer.phone && dispatch(postName(fullName, phoneNumber, true, false));
                    phoneNumber !== props.checkoutReducer.phone && dispatch(postNumber(phoneNumber, true));
                }
            }
        } else {
            fullNameValidations(fullName) === 1 ? setFullNameError('') : (
                setLoading(false),
                setIsFullNameError(true),
                setFullNameError(`${fullNameValidations(fullName)}`))
            phoneNumberValidations(phoneNumber) === 1 ? setPhoneNumberError('') : (
                setLoading(false),
                setIsPhoneNumberError(true),
                setPhoneNumberError(`${phoneNumberValidations(phoneNumber)}`)
            )
            emailAddressValidation(emailAddress) === 1 ? setEmailAddressError('') : (
                setLoading(false),
                setIsEmailAddressError(true),
                setEmailAddressError(`${emailAddressValidation(emailAddress)}`)
            )
        }
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => Keyboard.dismiss()}
                >
                    <View style={styles.emailaddressContainer}>
                        <PrimaryHeader
                            iconSize={vw(22)}
                            iconColor={colors.blackColor}
                            left={"left"}
                            title={t("AccountSettings")}
                            mainContainer={styles.headerMainContainer}
                            titleStyle={styles.headerTitleStyle}
                            leftPress={() => {
                                props.navigation.goBack()
                                setIsFullNameError(false)
                                setIsPhoneNumberError(false)
                            }
                            }
                        />
                        <View style={styles.textContainer}>
                            <PrimaryInput
                                ref={emailAddressRef}
                                titleText={styles.titleText}
                                placeholder={t("EmailAddress")}
                                title={t("EmailAddress")}
                                textInputStyle={styles.textInput1}
                                showTitle={true}
                                blurOnSubmit={false}
                                placeholderTextColor={colors.color_1B194B}
                                onChangeText={(text: any) => {
                                    setEmailAddress(text)
                                    setIsEmailAddressError(false)
                                }}
                                value={emailAddress}
                                onSubmitEditing={() => {
                                    emailAddressValidation(emailAddress) === 1 && fullNameRef.current.focus();
                                    emailAddressValidation(emailAddress) === 1 ? setEmailAddressError('') : (
                                        setIsEmailAddressError(true),
                                        setEmailAddressError(`${emailAddressValidation(emailAddress)}`))

                                }}
                                onFocus={() => {
                                    setIsFullNameError(false);
                                    setIsPhoneNumberError(false);
                                }}
                                showTitleText={true}
                                keyboardType={"default"}
                                editable={false}
                                isError={isemailAddressError}
                                errorMsg={emailAddressError}
                            />
                        </View>
                        <View style={[styles.textContainer, { marginTop: vh(60) }]}>
                            <PrimaryInput
                                ref={fullNameRef}
                                titleText={styles.titleText}
                                title={t("FullName")}
                                maxLength={30}
                                textInputStyle={styles.textInput}
                                showTitle={isShowTitleForName}
                                blurOnSubmit={false}
                                placeholderTextColor={colors.color_1B194B}
                                showTitleText={true}
                                returnKeyType={'next'}
                                keyboardType={"default"}
                                editable={loading === true ? false : true}
                                isError={isfullNameError}
                                errorMsg={fullNameError}
                                onChangeText={(text: any) => {
                                    setFullName(text)
                                    setIsFullNameError(false)
                                }}
                                value={fullName}
                                placeholder={isShowTitleForName === true ? "" : t("FullName")}
                                onSubmitEditing={() => {
                                    fullNameValidations(fullName) === 1 && phoneNumberRef.current.focus();
                                    fullNameValidations(fullName) === 1 ? setFullNameError('') : (
                                        setIsFullNameError(true),
                                        setFullNameError(`${fullNameValidations(fullName)}`))
                                }}
                                onFocus={() => {
                                    setIsShowTitleForName(true);

                                }}
                            />
                        </View>
                        <View style={[styles.textContainer, {
                            marginTop: vh(60),
                        }]}>
                            <PrimaryInput
                                ref={phoneNumberRef}
                                titleText={styles.titleText}
                                placeholder={isShowTitleForPhone === true ? "" : t("PhoneNumber")}
                                title={t("PhoneNumber")}
                                maxLength={15}
                                textInputStyle={styles.textInput}
                                showTitle={isShowTitleForPhone}
                                blurOnSubmit={false}
                                placeholderTextColor={colors.color_1B194B}
                                showTitleText={true}
                                keyboardType={"phone-pad"}
                                returnKeyType={'done'}
                                editable={loading === true ? false : true}
                                isError={isPhoneNumberError}
                                errorMsg={phoneNumberError}
                                onChangeText={(text: any) => {
                                    setPhoneNumber(text)
                                    setIsPhoneNumberError(false)
                                }}
                                value={phoneNumber}
                                onSubmitEditing={() => {
                                    phoneNumberValidations(phoneNumber) === 1 && Keyboard.dismiss();
                                    phoneNumberValidations(phoneNumber) === 1 ? (
                                        setPhoneNumberError(''),
                                        !props.checkoutReducer.isLoading && handleContinue()
                                    )
                                        : (
                                            setIsPhoneNumberError(true),
                                            setPhoneNumberError(`${phoneNumberValidations(phoneNumber)}`))

                                }}
                                onFocus={() => {
                                    setIsShowTitleForPhone(true)
                                }}
                            />
                        </View>
                        <Animated.View
                            animation="slideInUp"
                            iterationCount={1}
                            style={{
                                bottom: viewBottom,
                                position: 'absolute',
                                alignSelf: 'center'
                            }}
                        >
                            <PrimaryButton
                                title={t("Save")}
                                onPress={() => { !props.checkoutReducer.isLoading && (setLoading(true), handleContinue()) }}
                                touchablestyle={[styles.buttonStyle, {
                                }]}
                                textstyle={styles.buttonTextStyle}
                                isLoading={loading}
                            />
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </>
    )
}
function mapStateToProps(state: any) {
    const { checkoutReducer, authReducer } = state
    return {
        checkoutReducer,
        authReducer
    }
}
export default connect(
    mapStateToProps,
    null
)(AccountSetting)

