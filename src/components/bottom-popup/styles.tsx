import { colors, fonts, vh, vw } from "@app/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        position: "absolute",
        top: vh(0),
        bottom: vh(0),
        left: vw(0),
        right: vw(0),
        backgroundColor: colors.color_rgba_0_0_0_7,
    },
    secondModalContainer: {
        position: "absolute",
        bottom: vh(0),
        left: vw(0),
        right: vw(0),
        backgroundColor: colors.primary,
        paddingVertical: vh(19),
        paddingHorizontal: vw(20),
    },
    buttonStyle: {
        backgroundColor: colors.color_66F274,
        height: vh(50),
        width: vw(335),
        alignSelf: "center",
        marginBottom: vh(20)
    },
    buttonTextStyle: {
        color: colors.splashPrimary,
        fontFamily: fonts.interSemiBold,
    },
    hitSlop: {
        top: vh(10),
        right: vh(10),
        left: vw(10),
        bottom: vw(10)
    },
    crossImage: {
        height: vh(12),
        width: vh(12),
        marginTop: vh(2)
    },
    headerTextStyles: {
        marginTop: vh(31),
        fontSize: vw(30),
        lineHeight: vh(36),
        fontFamily: fonts.CheltenhamstdBook,
        textAlign: "center",
        color: colors.color_000000
    },
    messageTextStyles:
    {
        textAlign: "center",
        fontSize: vw(14),
        lineHeight: vh(25),
        fontFamily: fonts.poppinsRegular,
        color: colors.color_rgba_0_0_0_7
    }
})