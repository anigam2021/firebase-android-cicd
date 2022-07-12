import { colors, fonts, vh, vw } from "@app/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    headerMainContainer: {
        paddingHorizontal: vw(20), marginTop: vh(30)
    },
    headerTitleStyle: {
        fontSize: vw(18),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_071731
    },
    languageBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: vw(25),
        paddingVertical: vh(22),
        marginTop: vh(18)
    },
    radioBtn: {
        borderWidth: vw(1.5),
        height: vh(20),
        width: vh(20),
        borderRadius: vw(10),
        borderColor: "rgba(19, 91, 44, 0.32)",
        alignItems: 'center',
        justifyContent: 'center'
    },
    separatorView: {
        borderWidth: vw(1),
        borderColor: 'rgba(0, 0, 0, 0.1)',
        width: vw(335),
        alignSelf: 'center'
    },
    selectedLanguage: {
        height: vh(10),
        width: vh(10),
        backgroundColor: colors.color_135B2C,
        borderRadius: vw(5)
    },
    languageText: {
        fontSize: vw(14),
        lineHeight: vh(21),
        color: colors.color_1B194B
    },
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
    saveBtn: {
        position: 'absolute',
        bottom: vh(70),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})