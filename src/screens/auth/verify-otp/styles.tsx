import {
    StyleSheet
} from 'react-native';
import { colors, vw, vh, fonts } from '@app/constants';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    dataContainer: {
        flex: 1,
        paddingHorizontal: vw(20)
    },
    eatchIconContainer: {
        marginTop: vh(28),
    },
    eatchImageStyle: {
        width: vw(106),
        height: vh(29)
    },
    verifyAccountTextContainer: {
        marginTop: vh(24),
    },
    verifyYourAccountText: {
        fontSize: vw(28),
        lineHeight: vw(36),
        fontFamily: fonts.CheltenhamstdBook,
        color: colors.color_071731
    },
    weSentVerificationCodeText: {
        fontSize: vw(14),
        lineHeight: vw(25),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_071731,
        marginTop: vh(8)
    },
    emailText: {
        fontSize: vw(14),
        lineHeight: vw(25),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_1B463C
    },
    otpContainer: {
        marginTop: vh(58)
    },
    resendInvalidContainer: {
        alignSelf: "flex-end"
    },
    buttonContainer: {
        marginTop: vh(60)
    },
    indicatorWrapper: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: vh(19)
    },
    buttonStyle: {
        backgroundColor: colors.color_66F274,
        height: vh(56)
    },
    buttonTextStyle: {
        color: colors.splashPrimary,
        fontFamily: fonts.interSemiBold,
        fontSize: vw(16)
    },
    headerLeftWrapper: {
        marginTop: vh(34)
    }
})