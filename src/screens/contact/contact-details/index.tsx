
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { View, TouchableWithoutFeedback, StatusBar, Keyboard, Platform, TextInput, Animated } from 'react-native'
import { styles } from '@screen/contact/styles';
import { vw, vh, colors } from '@app/constants';
import { PrimaryButton, PrimaryHeader } from '@app/components';
import PrimaryInput from '@app/components/custom-input'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import { postName, postNumber } from '@screen/contact/contactAction/checkoutAction';
import { fullNameValidations, phoneNumberValidations } from '@screen/contact/validations';
import { ContactDetailsProps } from '@app/utils/interface';


const ContactDetails = (props: ContactDetailsProps) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const fullnameRef = useRef<TextInput>();
    const phoneRef = useRef();
    const [fullname, setFullname] = useState<string>(props.checkoutReducer.name ? props.checkoutReducer.name : "")
    const [phone, setPhone] = useState<string>(props.checkoutReducer.phone ? props.checkoutReducer.phone : "")
    const [isFullNameError, setIsFullNameError] = useState<boolean>(false)
    const [isPhoneNumberError, setIsPhoneNumberError] = useState<boolean>(false)
    const [fullNameError, setFullNameError] = useState<string>('')
    const [phoneNumberError, setPhoneNumberError] = useState<string>('')
    const [isShowTitleForFullName, setIsShowTitleForFullName] = useState<boolean>(false)
    const [isShowTitleForPhone, setIsShowTitleForPhone] = useState<boolean>(false)
    const viewBottom = useRef(new Animated.Value(vh(70))).current;
    const decreaseViewBottom = () => {
        Keyboard.dismiss()
        Animated.timing(viewBottom, {
            toValue: vh(70),
            duration: 400,
            useNativeDriver: false
        }).start()
    }
    function onKeyboardDidShow(e: any) {
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
        if (!!props.checkoutReducer.name) {
            setIsShowTitleForFullName(true);
        }
        if (!!props.checkoutReducer.phone) {
            setIsShowTitleForPhone(true);
        }
        //setPhone(props.checkoutReducer.phone)
        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };

    }, []);

    const handleContinue = () => {
        Keyboard.dismiss()
        if (fullNameValidations(fullname) === 1
            && phoneNumberValidations(phone) === 1) {
            setIsFullNameError(false);
            setIsPhoneNumberError(false);
            if (fullname === props.checkoutReducer.name
                && phone === props.checkoutReducer.phone) {
                props.navigation.goBack();
            }
            else {
                fullname !== props.checkoutReducer.name && phone !== props.checkoutReducer.phone && dispatch(postName(fullname, phone, false, true));
                phone !== props.checkoutReducer.phone && dispatch(postNumber(phone, false));
            }
        } else {
            fullNameValidations(fullname) === 1 ? setFullNameError('') : (
                setIsFullNameError(true),
                setFullNameError(`${fullNameValidations(fullname)}`));
            phoneNumberValidations(phone) === 1 ? setPhoneNumberError('') : (
                setIsPhoneNumberError(true),
                setPhoneNumberError(`${phoneNumberValidations(phone)}`))
        }
    }


    return (<>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
                <View style={styles.addressContainer}>
                    <PrimaryHeader
                        iconSize={vw(22)}
                        iconColor={colors.blackColor}
                        left={"left"}
                        title={t("contactDetails")}
                        mainContainer={styles.headerMainContainer}
                        titleStyle={styles.headerTitleStyle}
                        leftPress={() => props.navigation.goBack()}
                    />
                    <View style={styles.textContainer}>
                        <PrimaryInput
                            ref={fullnameRef}
                            placeholder={isShowTitleForFullName === true ? "" : t("fullName")}
                            title={t("fullName")}
                            maxLength={30}
                            onChangeText={(fullnameText: string) => {
                                setIsFullNameError(false)
                                setFullname(fullnameText);
                            }}
                            value={fullname}
                            // showTitle={fullname.length > 0 ? true : false}
                            showTitle={isShowTitleForFullName}
                            blurOnSubmit={false}
                            placeholderTextColor={colors.color_1B194B}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                fullNameValidations(fullname) === 1 && phoneRef.current.focus();
                                fullNameValidations(fullname) === 1 ? setFullNameError('') : (
                                    setIsFullNameError(true),
                                    setFullNameError(`${fullNameValidations(fullname)}`));
                            }}
                            showTitleText={true}
                            titleText={styles.titleText}
                            textInputStyle={styles.textInput}
                            editable={!props.checkoutReducer.isLoading ? true : false}
                            isError={isFullNameError}
                            errorMsg={fullNameError}
                            onFocus={() => { setIsShowTitleForFullName(true) }}
                        />
                    </View>

                    <View style={[styles.textContainer, { marginTop: vh(60) }]}>
                        <PrimaryInput
                            ref={phoneRef}
                            placeholder={isShowTitleForPhone === true ? "" : t("phoneNumber")}
                            title={t("phoneNumber")}
                            maxLength={15}
                            onChangeText={(phoneText: string) => {
                                setIsPhoneNumberError(false)
                                setPhone(phoneText)
                            }}
                            value={phone}
                            editable={!props.checkoutReducer.isLoading ? true : false}
                            // showTitle={phone.length > 0 ? true : false}
                            showTitle={isShowTitleForPhone}
                            blurOnSubmit={false}
                            placeholderTextColor={colors.color_1B194B}
                            returnKeyType={"done"}
                            showTitleText={true}
                            titleText={styles.titleText}
                            textInputStyle={styles.textInput}
                            keyboardType={"phone-pad"}
                            // editable={props.checkoutReducer.isLoading != true ? true : false}
                            isError={isPhoneNumberError}
                            errorMsg={phoneNumberError}
                            onFocus={() => {
                                setIsShowTitleForPhone(true);
                            }}
                            onSubmitEditing={() => {
                                phoneNumberValidations(phone) === 1 && Keyboard.dismiss();
                                phoneNumberValidations(phone) === 1 ?
                                    (
                                        setPhoneNumberError(''),
                                        handleContinue()
                                    )
                                    : (
                                        setIsPhoneNumberError(true),
                                        setPhoneNumberError(`${phoneNumberValidations(phone)}`))

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
                            title={t("continue")}
                            onPress={() => { !props.checkoutReducer.isLoading && handleContinue() }}
                            touchablestyle={[styles.buttonStyle, {
                            }]}
                            textstyle={styles.buttonTextStyle}
                            isLoading={props.checkoutReducer.isLoading}
                        />
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    </>
    )
}

function mapStateToProps(state: any) {
    const { checkoutReducer } = state
    return {
        checkoutReducer
    }
}

export default connect(
    mapStateToProps,
    null
)(ContactDetails)