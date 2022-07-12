import { vw, fonts, colors } from "@app/constants"
import { StyleSheet } from "react-native"

const stylesCommon = StyleSheet.create({
    baseStyle: {
        fontSize: vw(16),
        fontFamily: fonts.poppinsSemiBold,
        lineHeight: vw(21),
        color: colors.color_rgba_0_0_0_7
    },
    exponentStyle: {
        fontSize: 10,
        color: colors.color_rgba_0_0_0_7,
        fontFamily: fonts.poppinsSemiBold,
    },
    actIndMainView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default stylesCommon;