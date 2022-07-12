import { StyleSheet } from "react-native";
import {colors, vw, fonts} from "../../constants";
const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: "center",
        alignItems: "center",
        // paddingVertical: vh(18),
        backgroundColor: colors.color_135B2C,
        width: "100%",
        borderRadius: 8
    },
    textstyle: {
        fontSize: vw(16),
        lineHeight: vw(16),
        color: colors.whiteColor,
        alignSelf: "center",
        fontFamily: fonts.poppinsSemiBold
    },
    leftimage: {
        height: "100%",
        resizeMode: "contain",
        position: "absolute",
        left: 0
    },
    rightimage: {
        height: "100%",
        resizeMode: "contain",
        position: "absolute",
        right: 0
    }

})
export default styles;