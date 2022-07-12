
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { View, TouchableWithoutFeedback, StatusBar, Keyboard, Platform, Animated } from 'react-native'
import { styles } from '@screen/contact/styles';
import { vw, vh, colors, fonts } from '@app/constants';
import { PrimaryButton, PrimaryHeader } from '@app/components';
import PrimaryInput from '@app/components/custom-input'
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import { postDeliveryInstruction } from '@screen/contact/contactAction/checkoutAction';
import { deliveryInstructionValidations } from '@screen/contact/validations';
import { DeliveryInstructionProps, keyboard } from '@app/utils/interface';

const DeliveryInstruction = (props: DeliveryInstructionProps) => {
    const { t } = useTranslation();
    const instructionRef = useRef();
    const [instruction, setInstruction] = useState<string>(props.checkoutReducer.deliveryInstructions ? props.checkoutReducer.deliveryInstructions : "")
    const [isInstructionError, setIsInstructionError] = useState<boolean>(false)
    const [instructionError, setInstructionError] = useState<string>('')
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
        if (!!props.checkoutReducer.deliveryInstructions) {
            setIsShowTitle(true)
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
        if (deliveryInstructionValidations(instruction) === 1) {
            if (props.checkoutReducer.deliveryInstructions === null && instruction === "") {
                props.navigation.goBack();
                setLoader(false)
            } else {
                if (instruction !== props.checkoutReducer.deliveryInstructions) {
                    setIsInstructionError(false);
                    dispatch(postDeliveryInstruction(instruction));
                } else {
                    props.navigation.goBack();
                    setLoader(false)
                }
            }
        }
        else {
            setLoader(false)
            setIsInstructionError(true)
            setInstructionError(`${deliveryInstructionValidations(instruction)}`)
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
                        title={t("deliveryInstruction")}
                        mainContainer={styles.headerMainContainer}
                        titleStyle={styles.headerTitleStyle}
                        leftPress={() => props.navigation.goBack()}
                    />
                    <View
                        style={{
                            marginTop: vh(24),
                            borderBottomColor: colors.color_rgba_0_0_0_1,
                            borderBottomWidth: vw(1),
                        }}
                    >
                        <PrimaryInput
                            inputRef={instructionRef}
                            placeholder={isShowTitle === true ? "" : t("instruction")}
                            title={t("instruction")}
                            maxLength={250}
                            onChangeText={(instructionText: string) => {
                                setIsInstructionError(false)
                                setInstruction(instructionText);
                            }}
                            value={instruction}
                            showTitle={isShowTitle}
                            blurOnSubmit={false}
                            placeholderTextColor={colors.color_1B194B}
                            returnKeyType={"done"}
                            titleText={styles.titleText}
                            showTitleText={true}
                            textInputStyle={{
                                color: colors.color_1B194B,
                                fontFamily: fonts.poppinsRegular,
                                marginTop: vh(0),
                                paddingVertical: vh(5),
                                fontSize: vw(14),
                                lineHeight: vw(16),
                                borderWidth: 0,
                                textAlignVertical: "top",
                            }}
                            editable={loader === true ? false : true}
                            isError={isInstructionError}
                            errorMsg={instructionError}
                            multiline={true}
                            onFocus={() => { setIsShowTitle(true) }}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
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
)(DeliveryInstruction)


