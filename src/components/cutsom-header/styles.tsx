import { vh, vw, colors } from "@app/constants";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingBottom: 10
    },
    leftView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginEnd: 10,
        width: "10%"
    },
    centerView: {
        flex: 1,
        width: "50%"
    },
    rightView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginStart: 10,
        width: "10%"
    },
    hitSlop: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    },
    cartIcon: {
        width: vh(30),
        height: vh(30)
    },
    cartCountContainer: {
        width: vh(13),
        height: vh(13),
        borderRadius: vh(10),
        backgroundColor: colors.color_66F274,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        position: "absolute"
    },
    cartCountText: {
        fontSize: vw(8),
        color: colors.blackColor
    }
})