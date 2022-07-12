import React, { Component } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform,
    Text,
    TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { vw, vh, fonts, colors } from '../../constants';

const WIDTH = Dimensions.get('window').width;

const majorVersionIOS = parseInt(`${Platform.Version}`, 10);
const isOTPSupported = Platform.OS === 'ios' && majorVersionIOS >= 12;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textInput: {
        height: Platform.OS === "ios" ? vw(45) : vw(50),
        width: vw(45),
        //padding: 10,
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: vw(5),
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 23,
        fontFamily: fonts.poppinsSemiBold,
        paddingVertical: 0,
        paddingTop: Platform.OS === "ios" ? 0 : 6,
    },
    resendText: {
        fontSize: 14,
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_1B463C,
        marginTop: vh(11),
        textAlign: "right"
    },
    timerText: {
        fontSize: 14,
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_071731,
        marginTop: vh(11),
        textAlign: "right"
    },
    invalidText: {
        fontSize: 14,
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_C81B1B,
        marginTop: vh(11),
        textAlign: "right"
    },
    divider: {
        height: 3,
        width: vw(9),
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginHorizontal: vw(5)
    }
});

const getOTPTextChucks = (inputCount, inputCellLength, text) => {
    let otpText =
        text.match(new RegExp(".{1," + inputCellLength + "}", "g")) || [];

    otpText = otpText.slice(0, inputCount);

    return otpText;
};

class OTPTextView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: 0,
            otpText: getOTPTextChucks(
                props.inputCount,
                props.inputCellLength,
                props.defaultValue
            ),
        };

        this.inputs = [];
    }
    componentDidMount() {
        this.props.defaultValue?.length === 6 ? this.inputs[5].focus() : this.inputs[0].focus();
    }
    basicValidation = (text) => {

        const validText = /^[0-9a-zA-Z]+$/;
        return text.match(validText);
    };

    onTextChange = (text, i) => {
        const { inputCellLength, inputCount, handleTextChange } = this.props;

        if (text && !this.basicValidation(text)) {
            return;
        }

        this.setState(
            (prevState) => {
                let { otpText } = prevState;
                otpText[i] = text;
                return {
                    otpText,
                };
            },
            () => {
                handleTextChange(this.state.otpText.join(""));
                if (text.length === inputCellLength && i !== inputCount - 1) {
                    this.inputs[i + 1].focus();
                }
                if (i === inputCount - 1 && this.state.otpText[i].length > 0) {
                    // Keyboard.dismiss()
                }
            }
        );

    };

    onInputFocus = (i) => {
        const { otpText } = this.state;

        const prevIndex = i - 1;

        if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join("")) {
            this.inputs[prevIndex].focus();
            return;
        }

        this.setState({ focusedInput: i });
    };
    onKeyPress = (e, i) => {
        const { handleTextChange } = this.props;
        const val = this.state.otpText[i] || "";
        if (e.nativeEvent.key === "Backspace" && i !== 0 && !(val.length - 1)) {
            this.inputs[i - 1].focus();
        }
        if (e.nativeEvent.key === "Backspace" && i !== 0 && (val.length - 1)) {
            this.setState(
                (prevState) => {
                    let { otpText } = prevState;
                    otpText[i - 1] = '';
                    return {
                        otpText,
                    };
                },
                () => {
                    handleTextChange(this.state.otpText.join(""));
                    this.inputs[i - 1].focus();

                }
            );
        }
    };

    clear = () => {
        this.setState(
            {
                otpText: [],
            },
            () => {
                this.inputs[0].focus();
            }
        );
    };

    setValue = (value) => {
        const { inputCount, inputCellLength } = this.props;
        this.setState(
            {
                otpText: getOTPTextChucks(inputCount, inputCellLength, value),
            },
            () => {
                this.props.handleTextChange(value);
            }
        );
    };

    handleResend = () => {
        this.setState(
            {
                otpText: [],
            },
            () => {
                this.inputs[0].focus();
            }
        );
        this.props.handleResendOtp()
    }

    render() {
        const {
            inputCount,
            offTintColor,
            tintColor,
            defaultValue,
            inputCellLength,
            containerStyle,
            textInputStyle,
            keyboardType,
            inputTextColor,
            showResend,
            isInvalid,
            timer,
            dividerColor,
            showValidatorMsg,
            resendText,
            resendActiveOpacity,
            key,
            ...textInputProps
        } = this.props;

        const { otpText } = this.state;

        const TextInputs = [];

        for (let i = 0; i < inputCount; i += 1) {
            const inputStyle = [
                styles.textInput,
                textInputStyle,

                { borderColor: offTintColor, color: inputTextColor, },
            ];
            if (this.state.otpText[i]) {
                inputStyle.push({ borderColor: tintColor });
            }
            TextInputs.push(<>
                <TextInput
                    ref={(e) => {
                        this.inputs[i] = e;
                    }}
                    key={i}
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    autoFocus={i === 0 ? true : false}
                    value={otpText[i] || ""}
                    style={inputStyle}
                    maxLength={this.props.inputCellLength}
                    onFocus={() => this.onInputFocus(i)}
                    onChangeText={(text) => this.onTextChange(text, i)}
                    multiline={false}
                    onKeyPress={(e) => this.onKeyPress(e, i)}
                    textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
                    selectionColor={offTintColor}
                    {...textInputProps}
                />
                {
                    i === 2 &&
                    <View style={[styles.divider, { backgroundColor: dividerColor }]} />
                }

            </>
            );
        }

        return <View key={key}>
            <View style={[styles.container, containerStyle]}>
                {TextInputs}
            </View>
            <View style={{
                alignSelf: "flex-start", flexDirection: isInvalid ? "row" : "row-reverse", justifyContent: "space-between", width: "100%",
                paddingHorizontal: vw(5)
            }}>
                {isInvalid && <Text style={styles.invalidText}>ⓘ {this.props?.errorMessage}</Text>}
                <TouchableOpacity activeOpacity={resendActiveOpacity} onPress={() => this.handleResend()} >
                    <Text style={styles.resendText}>{resendText}</Text>
                </TouchableOpacity>
            </View>
        </View>;
    }
}

OTPTextView.propTypes = {
    defaultValue: PropTypes.string,
    inputCount: PropTypes.number,
    containerStyle: PropTypes.any,
    textInputStyle: PropTypes.any,
    inputCellLength: PropTypes.number,
    tintColor: PropTypes.string,
    offTintColor: PropTypes.string,
    handleTextChange: PropTypes.func,
    inputType: PropTypes.string,
    keyboardType: PropTypes.string,
    showResend: PropTypes.bool,
    isInvalid: PropTypes.bool,
    timer: PropTypes.string,
    inputTextColor: PropTypes.string,
    dividerColor: PropTypes.string,
    showValidatorMsg: PropTypes.bool,
    resendActiveOpacity: PropTypes.number,
    key: PropTypes.string
};

OTPTextView.defaultProps = {
    defaultValue: "",
    inputCount: 4,
    tintColor: "#071731",
    offTintColor: "rgba(7, 23, 49, 0.3)",
    inputCellLength: 1,
    containerStyle: {},
    textInputStyle: {},
    handleTextChange: () => {
        //this has been kept intentionally to override bydefault value.
    },
    keyboardType: "numeric",
    showResend: false,
    isInvalid: false,
    timer: "",
    inputTextColor: colors.color_1F094D,
    dividerColor: colors.color_1F094D,
    showValidatorMsg: false,
    resendActiveOpacity: 1,
    key: ""
};

export default OTPTextView;