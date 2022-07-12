import {
    StyleSheet,
    Platform
} from 'react-native';
import { colors, vw, vh, fonts } from '@app/constants';

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
    emptyBasketMainView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: vh(222)
    },
    imageBasketView: {
        width: vw(118),
        height: vh(100),
        alignSelf: "center"
    },
    textEmptyBasket: {
        alignSelf: "center",
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(12),
        lineHeight: vw(17),
        color: colors.color_rgba_0_0_0_7,
        marginTop: vh(20)
    },
    mainContainerBsktList: {
        backgroundColor: colors.color_DCE3D7
    },
    textDate: {
        paddingHorizontal: vw(20),
        fontFamily: fonts.poppinsSemiBold,
        fontSize: vw(12),
        lineHeight: vw(17),
        marginTop: vh(8),
        marginBottom: vh(4),
        color: colors.color_1B194B
    },
    mainWrapperEditDate: {
        marginBottom: vh(8),
        flexDirection: "row",
        alignItems: "center"
    },
    textDeliveryTime: {
        paddingStart: vh(20),
        paddingEnd: vh(10),
        fontSize: vw(12),
        lineHeight: vw(17),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_1B194B
    },
    textTime: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: vw(12),
        lineHeight: vw(16.5),
        color: colors.color_1B194B
    },
    imageEdit: {
        width: vw(14),
        height: vw(14)
    },
    menuImage: {
        width: vw(100),
        height: vw(100),
    },
    menuImageContainer: {
        width: vw(100),
        height: vw(100),
        backgroundColor: colors.color_E6DCC9,
        justifyContent: "center",
        alignItems: "center",
        marginEnd: vw(14)
    },
    seperatorView: {
        borderWidth: 1,
        borderColor: colors.color_rgba_0_0_0_1,
        width: "90%",
        alignSelf: "center",
        height: 0
    },
    buttonStyle: {
        backgroundColor: colors.color_66F274,
        height: vh(56),
        marginHorizontal: vw(20),
        width: "90%",
        alignSelf: "center",
        position: "absolute",
        bottom: Platform.OS === "android" ? 10 : 25
    },
    buttonTextStyle: {
        color: colors.color_135B2C,
        fontFamily: fonts.interSemiBold,
    },
    dayWiseMainContainer: {
        backgroundColor: colors.primary,
        paddingHorizontal: vw(20),
        paddingVertical: vw(10)
    },
    nameItem: {
        color: colors.blackColor,
        fontFamily: fonts.CheltenhamstdBook,
        fontSize: vw(16),
        lineHeight: vw(20),
        width: vw(215)
    },
    wrappperPlusMinus: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    innerWrapperPlusMinus: {
        flexDirection: "row",
        alignItems: "center",
    },
    imagePlus: {
        width: vw(24),
        height: vw(24),
    },
    textQuantity: {
        color: colors.blackColor,
        fontSize: vw(13),
        marginHorizontal: vw(10),
        fontFamily: fonts.poppinsSemiBold
    },
    imageMinus: {
        width: vw(24),
        height: vw(24),
    },
    main2: {
        marginTop: vh(18),
        marginBottom: vh(14)
    },
    cellDayPriceWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignSelf: "center",
        paddingVertical: vh(8)
    },
    textDay: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: vw(12),
        lineHeight: vw(17),
        color: colors.color_rgba_0_0_0_7,
    },
    textPrice: {
        fontFamily: fonts.poppinsSemiBold,
        fontSize: vw(16),
        lineHeight: vw(21),
        color: colors.color_rgba_0_0_0_7,
    },
    billBreakerWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignSelf: "center",
        paddingVertical: vh(8)
    },
    textTotalNd: {
        marginTop: vh(18),
        // marginBottom: vh(44),
        paddingBottom: Platform.OS === "android" ? vh(104) : vh(54),
    },
    basketViewMain: {
        marginTop: vh(15),
        flex: 1
    },
    mainWrapperSubscript: { flexDirection: 'row' },
    baseViewWrapper: { alignItems: 'flex-end' },
    exponentViewWrapper: { alignItems: 'flex-start' },
    modalContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.color_rgba_0_0_0_7
    },
    modalSecondryContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.primary,
        paddingVertical: vh(20)
    },
    modalDataContainer: {
        paddingHorizontal: vw(20)
    },
    selectedTimeForDeliveryText: {
        fontSize: vw(16),
        lineHeight: vw(24),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_0A0045
    },
    dayDateContainer: {
        backgroundColor: colors.color_DCE3D7,
        paddingVertical: vh(10),
        paddingHorizontal: vh(20),
        marginTop: vh(14)
    },
    dayDateText: {
        fontSize: vw(12),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_1B194B,
        lineHeight: vw(16.5)
    },
    slotContainer: {
        paddingHorizontal: vw(20),
        marginTop: vh(22)
    },
    buttonModalStyle: {
        backgroundColor: colors.color_66F274,
        height: vh(56),
        marginHorizontal: vw(20),
        // width: "90%",
        alignSelf: "center"
    },
    buttonModalTextStyle: {
        color: colors.color_135B2C,
        fontFamily: fonts.interSemiBold,
    },

    imageWrapper: {
        width: vw(16),
        height: vw(16)
    },
    dataContainer: {
        flex: 1,
        marginBottom: vh(24),
        marginHorizontal: vw(14)

    },
    // dataContainer: { marginHorizontal: 14 },
    detailsContainer: {
        flexDirection: "row",
        marginLeft: vw(11),
        alignItems: "center"
    },
    nameText: {
        color: colors.color_1B463C,
        marginStart: vw(7),
        fontSize: vw(10),
        fontFamily: fonts.poppinsRegular,
        lineHeight: vh(16)
    },
    renderHeaderContainer: {
        backgroundColor: "rgba(220, 227, 215, 0.3)",
        borderRadius: vw(16),
        paddingVertical: vh(22)
    },
    countItem: {
        fontSize: vw(12),
        fontFamily: fonts.poppinsSemiBold,
        lineHeight: vw(14),
        color: colors.color_000000
    }
})