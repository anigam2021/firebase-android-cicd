
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { View, TouchableWithoutFeedback, StatusBar, Keyboard, Platform, Animated, TextInput } from 'react-native'
import { styles } from '@app/screens/contact/styles';
import { vw, vh, colors } from '@app/constants';
import { PrimaryButton, PrimaryHeader } from '@app/components';
import PrimaryInput from '@app/components/custom-input'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import { postAddAddress } from '@screen/contact/contactAction/checkoutAction';
import { houseNumberValidations, postalCodeValidations, streetValidations } from '../../validations';
import { AddAddressProps, keyboard } from '@app/utils/interface';
import BottomPopUp from '@app/components/bottom-popup';
import types from "@app/screens/contact/contactAction/types";


const AddAddress = (props: AddAddressProps) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const streetNameRef = useRef<TextInput>();
    const houseNumberRef = useRef<TextInput>();
    const postalCodeRef = useRef<TextInput>();
    const [streetName, setStreetName] = useState<string>(
        props.checkoutReducer.address ? props.checkoutReducer.address.street : ""
    )
    const [houseNumber, setHouseNumber] = useState<string>(
        props.checkoutReducer.address ? props.checkoutReducer.address.houseNumber : ""
    )
    const [postalCode, setPostalCode] = useState<string>(
        props.checkoutReducer.address ? props.checkoutReducer.address.postalCode : ""
    )

    const [isStreetNameError, setIsStreetNameError] = useState<boolean>(false)
    const [isHouseNumberError, setIsHouseNumberError] = useState<boolean>(false)
    const [isPostalCodeError, setIsPostalCodeError] = useState<boolean>(false)
    const [streetNameError, setStreetNameError] = useState<string>('')
    const [houseNumberError, setHouseNumberError] = useState<string>('')
    const [postalCodeError, setPostalCodeError] = useState<string>('')
    const [isShowTitleForStreet, setIsShowTitleForStreet] = useState<boolean>(false)
    const [isShowTitleForHouseNumber, setIsShowTitleForHouseNumber] = useState<boolean>(false)
    const [isShowTitleForPostalCode, setIsShowTitleForPostalCode] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false)
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
        setLoader(false)
        if (!!props.checkoutReducer?.address?.street) {
            setIsShowTitleForStreet(true);
        }
        if (!!props.checkoutReducer?.address?.houseNumber) {
            setIsShowTitleForHouseNumber(true)
        }
        if (!!props.checkoutReducer?.address?.street) {
            setIsShowTitleForPostalCode(true)
        }
        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);


    const handleContinue = () => {
        Keyboard.dismiss()
        setLoader(true)
        const data = {
            street: streetName,
            houseNumber: houseNumber,
            postalCode: postalCode
        }
        if (streetValidations(streetName) === 1
            && houseNumberValidations(houseNumber) === 1
            && postalCodeValidations(postalCode) === 1) {
            setIsStreetNameError(false)
            setIsHouseNumberError(false)
            setIsPostalCodeError(false)
            if (props.checkoutReducer.address === null) {
                dispatch(postAddAddress(data,
                    (errorCallback: any) => {
                        // setIsPostalCodeError(true)
                        // setPostalCodeError(`ⓘ ${errorCallback}`)
                    }));
                setLoader(false);
            } else {
                if (streetName === props.checkoutReducer.address.street
                    && houseNumber === props.checkoutReducer.address.houseNumber
                    && postalCode === props.checkoutReducer.address.postalCode) {
                    props.navigation.goBack();
                    setLoader(false);
                }
                else {
                    dispatch(postAddAddress(data,
                        (errorCallback: any) => {
                            // setIsPostalCodeError(true)
                            // setPostalCodeError(`ⓘ ${errorCallback}`)
                        }
                    ));
                    setLoader(false);
                    // props.checkoutReducer.isLoading === false ? setLoader(false) : setLoader(true)
                }
            }
        } else {
            streetValidations(streetName) === 1 ? setStreetNameError('') : (
                setLoader(false),
                setIsStreetNameError(true),
                setStreetNameError(`${streetValidations(streetName)}`))
            houseNumberValidations(houseNumber) === 1 ? setHouseNumberError('') : (
                setLoader(false),
                setIsHouseNumberError(true),
                setHouseNumberError(`${houseNumberValidations(houseNumber)}`)
            )
            postalCodeValidations(postalCode) === 1 ? setPostalCodeError('') : (
                setLoader(false),
                setIsPostalCodeError(true),
                setPostalCodeError(`${postalCodeValidations(postalCode)}`))
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
                        title={t("address")}
                        mainContainer={styles.headerMainContainer}
                        titleStyle={styles.headerTitleStyle}
                        leftPress={() => props.navigation.goBack()}
                    />
                    <View style={styles.textContainer}>
                        <PrimaryInput
                            ref={streetNameRef}
                            placeholder={isShowTitleForStreet === true ? "" : t("streetName")}
                            title={t("streetName")}
                            maxLength={50}
                            onChangeText={(streetNameText: string) => {
                                setIsStreetNameError(false)
                                setStreetName(streetNameText);
                            }}
                            value={streetName}
                            // lengthOfText={streetName.length > 0 ? true : false}
                            showTitle={isShowTitleForStreet}
                            blurOnSubmit={false}
                            placeholderTextColor={colors.color_1B194B}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                streetValidations(streetName) === 1 && houseNumberRef.current.focus();
                                streetValidations(streetName) === 1 ? setStreetNameError('') : (
                                    setIsStreetNameError(true),
                                    setStreetNameError(`${streetValidations(streetName)}`))
                            }}
                            showTitleText={true}
                            titleText={styles.titleText}
                            textInputStyle={styles.textInput}
                            keyboardType={"default"}
                            editable={loader === true ? false : true}
                            isError={isStreetNameError}
                            errorMsg={streetNameError}
                            onFocus={() => {
                                setIsShowTitleForStreet(true);
                            }}
                        />

                    </View>
                    <View style={[styles.textContainer, { marginTop: vh(60) }]}>
                        <PrimaryInput
                            ref={houseNumberRef}
                            placeholder={isShowTitleForHouseNumber === true ? "" : t("houseNumber")}
                            title={t("houseNumber")}
                            maxLength={10}
                            onChangeText={(houseNumberText: string) => {
                                setIsHouseNumberError(false)
                                setHouseNumber(houseNumberText)
                            }}
                            value={houseNumber}
                            // showTitle={houseNumber.length > 0 ? true : false}
                            showTitle={isShowTitleForHouseNumber}
                            blurOnSubmit={false}
                            placeholderTextColor={colors.color_1B194B}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                houseNumberValidations(houseNumber) === 1 ? setHouseNumberError('') : (
                                    setIsHouseNumberError(true),
                                    setHouseNumberError(`${houseNumberValidations(houseNumber)}`)
                                )
                                houseNumberValidations(houseNumber) === 1 && postalCodeRef.current.focus();
                            }}
                            showTitleText={true}
                            titleText={styles.titleText}
                            textInputStyle={styles.textInput}
                            keyboardType={"default"}
                            editable={loader === true ? false : true}
                            isError={isHouseNumberError}
                            errorMsg={houseNumberError}
                            onFocus={() => {
                                setIsShowTitleForHouseNumber(true);
                            }}
                        />
                    </View>
                    <View style={[styles.textContainer, {
                        marginTop: vh(60),
                    }]}>
                        <PrimaryInput
                            ref={postalCodeRef}
                            placeholder={isShowTitleForPostalCode === true ? "" : t("postalCode")}
                            title={t("postalCode")}
                            maxLength={10}
                            onChangeText={(postalCodeText: string) => {
                                setIsPostalCodeError(false)
                                setPostalCode(postalCodeText)
                            }}
                            value={postalCode}
                            // showTitle={postalCode.length > 0 ? true : false}
                            showTitle={isShowTitleForPostalCode}
                            blurOnSubmit={false}
                            placeholderTextColor={colors.color_1B194B}
                            returnKeyType={"done"}
                            showTitleText={true}
                            titleText={styles.titleText}
                            textInputStyle={styles.textInput}
                            keyboardType={"default"}
                            editable={loader === true ? false : true}
                            isError={isPostalCodeError}
                            errorMsg={postalCodeError}
                            onFocus={() => {
                                setIsShowTitleForPostalCode(true)
                            }}
                            onSubmitEditing={() => {
                                postalCodeValidations(postalCode) === 1 && Keyboard.dismiss();
                                postalCodeValidations(postalCode) === 1 ?
                                    (
                                        setPostalCodeError(''),
                                        !props.checkoutReducer.isLoading && handleContinue()
                                    ) : (
                                        setIsPostalCodeError(true),
                                        setPostalCodeError(`${postalCodeValidations(postalCode)}`));

                            }}
                            autoCapitalize={"characters"}
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

        {
            props.checkoutReducer.postalCodeError && <BottomPopUp
                visible={props.checkoutReducer.postalCodeError}
                buttonTitle={`${t('close')}`}
                ButtonPress={() => dispatch({
                    type: types.API_ERROR_MESSAGE,
                    postalCodeError: false,
                    errorMessage: '',
                })}
                ButtonPressCross={
                    () => dispatch({
                        type: types.API_ERROR_MESSAGE,
                        postalCodeError: false,
                        errorMessage: '',
                    })
                }
                headerText={`${t('ComingSoon')}`}
                messageText1={`${t('Sorrywedontcoveryourpostalcodeyet')}`}
                messageText2={`${t('butweareexpandingintonewareas')}`}
                messageText3={`${t('everydaystaytuned')}`}
            />
        }
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
)(AddAddress)