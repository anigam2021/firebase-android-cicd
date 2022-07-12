
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { View, TouchableWithoutFeedback, StatusBar, Keyboard, Platform, Animated } from 'react-native'
import { styles } from '@screen/basket/promo-code/styles';
import { vw, vh, colors } from '@app/constants';
import { PrimaryButton, PrimaryHeader } from '@app/components';
import PrimaryInput from '@app/components/custom-input'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import { postPromoCode } from '@screen/basket/basketAction/basketAction';
import { promoCodeValidation } from '@screen/basket/validation';
import { PromoCodeProps, keyboard } from '@app/utils/interface';

const PromoCode = (props: PromoCodeProps) => {
    const { t } = useTranslation();
    const promoCodeRef = useRef();
    const [promoCode, setPromoCode] = useState<string>("")
    const [isPromoCodeError, setIsPromoCodeError] = useState<boolean>(false)
    const [promoCodeError, setPromoCodeError] = useState<string>('')
    const [isShowTitle, setIsShowTitle] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false)
    const dispatch = useDispatch()
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
        // if (!!props.checkoutReducer.deliverypromoCodes) {
        //     setIsShowTitle(true)
        // }
        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleContinue = () => {
        Keyboard.dismiss()
        promoCodeValidation(promoCode)
        if (promoCodeValidation(promoCode) === 1) {
            dispatch(postPromoCode(promoCode, false, (errorCallback: any) => {
                setIsPromoCodeError(true)
                setPromoCodeError(`ⓘ ${errorCallback}`)
            }))
        } else {
            setIsPromoCodeError(true)
            setPromoCodeError(`${promoCodeValidation(promoCode)}`)
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
                        title={t("PromoCode")}
                        mainContainer={styles.headerMainContainer}
                        titleStyle={styles.headerTitleStyle}
                        leftPress={() => props.navigation.goBack()}
                    />
                    <View
                        style={{
                            marginTop: vh(24),
                        }}
                    >
                        <PrimaryInput
                            ref={promoCodeRef}
                            placeholder={isShowTitle === true ? "" : t("Addpromocode")}
                            title={t("PromoCode")}
                            maxLength={250}
                            onChangeText={(promoCodeText: string) => {
                                setIsPromoCodeError(false)
                                setPromoCode(promoCodeText);
                            }}
                            value={promoCode}
                            showTitle={isShowTitle}
                            blurOnSubmit={false}
                            placeholderTextColor={colors.color_1B194B}
                            returnKeyType={"done"}
                            titleText={styles.titleText}
                            showTitleText={true}
                            textInputStyle={styles.textInput}
                            editable={loader === true ? false : true}
                            isError={isPromoCodeError}
                            errorMsg={promoCodeError}
                            multiline={false}
                            onFocus={() => { setIsShowTitle(true) }}
                            onSubmitEditing={() => {
                                handleContinue()
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
                            title={t("apply")}
                            onPress={() => { handleContinue() }}
                            touchablestyle={[styles.buttonStyle, {
                            }]}
                            textstyle={styles.buttonTextStyle}
                        // isLoading={props.checkoutReducer.isLoading}
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
)(PromoCode)


