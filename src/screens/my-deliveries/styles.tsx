import { Platform, StyleSheet } from "react-native";
import { vw, vh, colors, fonts } from "@app/constants";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.color_FFFEF5,
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: vw(14),
    },
    headerMainContainer: {
        paddingHorizontal: vw(6),
        marginTop: vh(30)
    },
    headerTitleStyle: {
        fontSize: vw(18),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_071731
    },
    listContainer: {
        flexDirection: "row",
        marginTop: vh(27),
        justifyContent: "space-around",
        borderBottomColor: colors.color_135B2C,
        borderBottomWidth: vw(1),
        marginHorizontal: vw(6),
    },
    tabTextContainer: {
        fontSize: vw(14),
        fontFamily: fonts.poppinsMedium,
        height: vh(40),
    },
    selectedContainer: {
        height: vh(3),
        backgroundColor: colors.color_135B2C,
        borderTopLeftRadius: vw(3),
        borderTopRightRadius: vw(3),
        borderBottomLeftRadius: vw(0),
        borderBottomRightRadius: vw(0),
        marginTop: vh(-3),
    },
    listWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: vw(22),
        marginTop: vh(24)
    },
    boxContainer: {
        backgroundColor: 'rgba(220, 227, 215, 0.3)',
        borderRadius: vw(16),
        marginTop: vh(4),
    },
    calenderContainer: {
        flexDirection: "row",
        marginTop: vh(20),
        marginHorizontal: vw(27),
    },
    calenderText: {
        fontSize: vw(10),
        fontFamily: fonts.poppinsRegular,
        lineHeight: vh(16.50),
        color: colors.color_1B463C
    },
    spaceBetweenCalenderAndText: {
        marginStart: vw(11)
    },
    orderItemListContainer: {
        marginHorizontal: vw(13),
        marginVertical: vh(16),
        flexDirection: "row"
    },
    imageContainer: {
        width: vw(100),
        height: vh(100)
    },
    receiptText: {
        textDecorationLine: 'underline',
        color: colors.color_rgba_0_0_0_7,
        fontSize: vw(12),
        lineHeight: vw(16),
        fontFamily: fonts.poppinsBold,
    },
    foodNameContainer: {
        marginStart: Platform.OS === "ios" ? vw(14) : vw(28),
        marginVertical: vh(9),
    },
    foodTitleText: {
        fontSize: vw(16),
        lineHeight: vh(19),
        fontFamily: fonts.CheltenhamstdBook,
        height: vh(40),
        width: Platform.OS === "ios" ? vw(190) : vw(185),
        color: colors.blackColor,
    },
    dateText: {
        color: colors.color_1B463C,
        fontSize: vw(14),
        fontFamily: fonts.poppinsRegular,
        lineHeight: vh(18),
    },
    quantityText: {
        marginVertical: vh(13),
        fontSize: vw(14),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_rgba_0_0_0_8
    },
    buttonStyle: {
        backgroundColor: colors.color_66F274,
        height: vh(50),
        width: vw(335),
        alignSelf: "center",
        marginBottom: Platform.OS === "android" ? 10 : 0
    },
    buttonTextStyle: {
        color: colors.splashPrimary,
        fontFamily: fonts.interSemiBold,
    },
    upcomingbutton:
    {
        height: vh(40),
        width: vw(167),
        alignItems: 'center',
    },
    emptyText: {
        marginTop: vh(20),
        color: colors.color_rgba_0_0_0_7,
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(12),
        lineHeight: vw(17)
    }

})