import { colors, fonts, vh, vw } from "@app/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    headerTitleStyle: {
        fontSize: vw(18),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_071731
    },
    emailaddressContainer: {
        flex: 1,
        paddingHorizontal: vw(20)
    },
    titleText: {
        position: "absolute",
        height: vh(17),
        marginTop: vh(-20),
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(10),
        display: "flex",
        alignItems: "center",
        color: colors.color_1B194B,
    },
    textInput: {
        color: colors.color_1B194B,
        fontFamily: fonts.poppinsRegular,
        height: vh(30),
        marginTop: vh(0),
        paddingVertical: 0,
        fontSize: vw(14),
        lineHeight: vw(16),
        borderWidth: 0,
    },
    textInput1: {
        color: colors.color_DBDBDB,
        fontFamily: fonts.poppinsRegular,
        height: vh(30),
        marginTop: vh(0),
        paddingVertical: 0,
        fontSize: vw(14),
        lineHeight: vw(16),
        borderWidth: 0,
    },
    headerMainContainer: {
        marginTop: vh(30)
    },
    // headerTitleStyle: {
    //     fontSize: vw(18),
    //     lineHeight: vw(20),
    //     fontFamily: fonts.poppinsMedium,
    //     color: colors.color_071731
    // },
    textContainer: {
        marginTop: vh(24),
        height: vh(30),
        borderBottomColor: colors.color_rgba_0_0_0_1,
        borderBottomWidth: vw(1),
    },
    // titleText: {
    //     position: "absolute",
    //     height: vh(17),
    //     marginTop: vh(-20),
    //     fontFamily: fonts.poppinsRegular,
    //     fontSize: vw(10),
    //     display: "flex",
    //     alignItems: "center",
    //     color: colors.color_1B194B,
    // },
    // textInput: {
    //     color: colors.color_1B194B,
    //     fontFamily: fonts.poppinsRegular,
    //     height: vh(30),
    //     marginTop: vh(0),
    //     paddingVertical: 0,
    //     fontSize: vw(14),
    //     lineHeight: vw(16),
    //     borderWidth: 0,
    // },
    buttonStyle: {
        backgroundColor: colors.color_66F274,
        height: vh(50),
        width: vw(335),
        position: "absolute",
        alignSelf: "center"
    },
    buttonTextStyle: {
        color: colors.splashPrimary,
        fontFamily: fonts.interSemiBold,
    },
})