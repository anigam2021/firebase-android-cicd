import { colors, fonts, vh, vw } from "@app/constants"
import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    headerMainContainer: {
        paddingHorizontal: vw(20), marginTop: vh(30)
    },
    headerTitleStyle: {
        fontSize: vw(18),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_071731
    },
    mainView: {
        flex: 1,
        backgroundColor: colors.color_FFFEF5
    },
    headingTextStyle: {
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(18),
        lineHeight: vh(24),
        marginTop: vh(63),
        paddingHorizontal: vw(20),
        color: colors.color_071731
    },
    updateTextStyle: {
        paddingHorizontal: vw(20),
        marginTop: vh(32),
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(12),
        lineHeight: vh(25),
        color: colors.color_rgba_0_0_0_7
    },
    contentView: {
        paddingHorizontal: vw(20),
        alignSelf: "center"
    },

})
export const contentViewTextStyle: any = {
    p: {
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(14),
        lineHeight: vh(25),
        color: colors.color_rgba_0_0_0_7,
    }
}