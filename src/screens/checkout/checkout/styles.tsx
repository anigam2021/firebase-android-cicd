import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { colors, vw, vh, fonts } from '@app/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    dataContainer: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    dataPadding20: {
        paddingHorizontal: vw(23),
    },
    dataPadding18: {
        paddingStart: vw(15),
        paddingEnd: vw(23),
    },
    deliverySlotContainer: {
        marginTop: vh(15)
    },
    renderDeliverySlotsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: vh(6),
        marginEnd: vw(23),
        marginStart: vw(49),
        height: vh(17.2)
        // marginStart: vw(29),
        // width: vw(285)
    },
    dayAndDateText: {
        fontSize: vw(13),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_1B194B,
        lineHeight: vw(16.5),
        width: vw(155)
    },
    slotAndEditContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: vw(142)
    },
    deliverySlotLoader: {
        alignItems: "center",
        justifyContent: "center",
    },
    slotText: {
        fontSize: vw(13),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_1B194B,
        lineHeight: vw(16.5),
        width: vw(128)
    },
    dividerDeliverySlot: {
        width: "90%",
        height: 0,
        borderWidth: 1,
        borderColor: colors.color_rgba_0_0_0_1,
        marginTop: vh(14),
        marginBottom: vh(20),
        alignSelf: "center"
    },
    divider: {
        width: "90%",
        height: 0,
        borderWidth: 1,
        borderColor: colors.color_rgba_0_0_0_1,
        marginVertical: vh(20),
        alignSelf: "center"
    },
    buttonStyle: {
        backgroundColor: colors.color_66F274,
        height: vh(56),
        marginHorizontal: vw(20),
        width: "90%",
        alignSelf: "center",
        position: "absolute",
        bottom: Platform.OS === "android" ? vh(10) : vh(25)
    },
    buttonTextStyle: {
        color: colors.color_135B2C,
        fontFamily: fonts.interSemiBold,
    },
    //Edit Slot Modal
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
    orderBeforeText: {
        fontSize: vw(12),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_5A5959,
        lineHeight: vw(17),
        textAlign: "center"
    },
    eveningDeliveryText: {
        fontSize: vw(12),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_888888,
        lineHeight: vw(17),
        textAlign: "center",
        marginTop: vh(5)
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
    headerMainContainer: {
        paddingHorizontal: vw(20), marginTop: vh(30)
    },
    headerTitleStyle: {
        fontSize: vw(18),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_071731
    }
})