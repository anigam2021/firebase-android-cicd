import { colors, fonts, vh, vw } from "@app/constants";
import { StyleSheet } from "react-native";

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
    headingTextStyle: {
        marginTop: vh(63),
        paddingHorizontal: vw(20),
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(18),
        lineHeight: vh(24),
        color: colors.color_071731
    },
    updateTextStyle: {
        paddingHorizontal: vw(20),
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(12),
        lineHeight: vh(25),
        color: colors.color_rgba_0_0_0_7,
        marginTop: vh(32),
    },
    contentView: {
        paddingHorizontal: vw(20),
    },
    contentViewTextStyle: {
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(14),
        lineHeight: vh(25),
    }

})
export const contentViewTextStyle: any = {
    p: {
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(14),
        lineHeight: vh(25),
        color: colors.color_rgba_0_0_0_7
    }
}
