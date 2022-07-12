import {
    StyleSheet
} from 'react-native';

import { colors, vh, vw, fonts } from '@app/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    dataContainer: {
        flex: 1,
        position: "absolute",
        width: "100%"
    },
    eatchLogoContainer: {
        alignSelf: "center",
        marginTop: vh(45)
    },
    splashMainImageContainer: {
        alignSelf: "flex-end",
        marginTop: vh(40),
        height: vh(358)
    },
    splashImage: {
        height: vw(350),
        width: vw(350)
    },
    welcomeTextContainer: {
        alignSelf: "center",
        marginTop: vh(18),
    },
    welcomeText: {
        fontSize: vw(28),
        fontFamily: fonts.CheltenhamstdBook,
        color: colors.color_071731,
        lineHeight: vw(36)
    },
    inputContainer: {
        alignSelf: "center",
        marginTop: vh(24),
        paddingHorizontal: vw(20),
        width: "100%"
    },
    buttonContainer: {
        alignSelf: "center",
        marginTop: vh(24),
        paddingHorizontal: vw(20),
        width: "100%"
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
    },
    textInputStyle: {
        height: vh(56)
    }
})