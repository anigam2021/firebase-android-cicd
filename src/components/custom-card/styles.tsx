import {
    StyleSheet
} from 'react-native';
import { vw, vh, fonts, colors } from '@app/constants';
export const styles = StyleSheet.create({
    mainWrapperSubscript: { flexDirection: 'row' },
    baseViewWrapper: { alignItems: 'flex-end' },
    exponentViewWrapper: { alignItems: 'flex-start' },
    menuDateAndDayContainer: {
        width: vw(97),
        height: vh(77),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: vh(12),
    },
    menuDayText: {
        fontSize: vw(14),
        fontFamily: fonts.poppinsMedium,
        lineHeight: vw(21),
        textAlign: "center"
    },
    menuDateText: {
        fontFamily: fonts.poppinsMedium,
        textAlign: "center",
        marginTop: vh(4)
    },
    menuItemContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        // alignItems: "center",
        paddingVertical: vh(16)
    },
    menuImageContainer: {
        width: vw(140),
        height: vw(140),
        backgroundColor: colors.color_E6DCC9,
        justifyContent: "center",
        alignItems: "center"
    },
    menuImage: {
        width: vw(140),
        height: vw(140),
    },
    menuDataContainer: {
        marginStart: vw(14),
        width: vw(175),
        justifyContent: "space-between"
    },
    menuTitleText: {
        fontSize: vw(16),
        lineHeight: vw(19),
        fontFamily: fonts.CheltenhamstdBook,
        color: colors.blackColor,
        height: vh(40)
    },
    menuDataText: {
        fontSize: vw(12),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_rgba_0_0_0_5,
        height: vh(40),
        marginTop: vh(2)
    },
    menuCategoryContainer: {
        // width: vw(24),
        paddingHorizontal: vw(4),
        height: vw(20),
        borderRadius: vw(4),
        borderColor: colors.color_66F274,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginEnd: vh(8),
        marginTop: vh(7)
    },
    tagTextColor: {
        fontSize: vw(10),
        fontFamily: fonts.interSemiBold,
        color: colors.color_rgba_0_0_0_5
    },
    menuCategoryText: {
        fontSize: vw(12),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_404A61
    },
    priceAndAddContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    menuPriceText: {
        fontSize: vw(16),
        lineHeight: vw(20),
        color: colors.color_rgba_0_0_0_7,
        fontFamily: fonts.poppinsSemiBold
    },
    soldOutContainer: {
        width: vw(90),
        paddingVertical: vh(2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.color_DCE3D7,
        borderRadius: vw(24)
    },
    soldOuTText: {
        fontSize: vw(12),
        color: colors.color_rgba_0_0_0_7,
        fontFamily: fonts.poppinsRegular,
        textAlign: "center"
    },
    //TimeSlotMenu
    timeSlotMenuContainer: {
        // paddingVertical: vh(12),
        height: vh(45),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    timeSlotMenuSelector: {
        height: vw(20),
        width: vw(20),
        borderRadius: vw(10),
        borderWidth: vw(1.5),
        justifyContent: "center",
        alignItems: "center"
    },
    timeSlotMenuSelected: {
        height: vw(10),
        width: vw(10),
        borderRadius: vw(10),
        backgroundColor: colors.splashPrimary
    },
    slotTimeText: {
        fontSize: vw(14),
        lineHeight: vw(21),
        color: colors.color_405076,
        fontFamily: fonts.poppinsSemiBold,
        width: "80%"
    },
    //DeliverySlotCheckout
    deliverySlotCheckoutContainer: {

    },
    deliverySlotContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    delvierySlotText: {
        fontSize: vw(14),
        // lineHeight: vw(16),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_1B194B,
        alignSelf: "center",
        marginStart: vw(12),
    },
    checkoutImageContainer: {
        width: vw(37),
        // height: vh(22),
        alignItems: "flex-end",
    },
    //CheckoutAddressDeliveryCard
    imageAndTitleAndEditContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginEnd: vw(23)
        //marginTop: vh(13)
    },
    imageAndTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleText: {
        fontSize: vw(14),
        fontFamily: fonts.poppinsSemiBold,
        lineHeight: vw(16.5),
        color: colors.color_1B194B,
        marginStart: vw(12)
    },
    subTitleText: {
        fontSize: vw(13),
        fontFamily: fonts.poppinsRegular,
        lineHeight: vw(16.5),
        color: colors.color_1B194B,
        marginEnd: vw(50),
        // marginTop: vh(6),
    },
    subTextTitleContainer: {
        flexDirection: "row",
        marginStart: vw(49),
        alignItems: "center",
        marginTop: vh(6)
    },
    wrapperClickableImage: {
        height: vh(24),
        width: vh(24)
    },
    textQuantity: {
        fontSize: vw(13),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.blackColor,
        paddingHorizontal: vw(10)
    }
})