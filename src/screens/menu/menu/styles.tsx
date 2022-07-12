import {
    StyleSheet
} from 'react-native';
import { colors, vw, vh, fonts } from '@app/constants';
import { width } from '@app/constants/dimension';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    dataContainer: {
        // flex: 1,
        paddingHorizontal: vw(20)
    },
    headerContainer: {
        marginTop: vh(30)
    },
    dateContainer: {
        marginTop: vh(15),
        backgroundColor: colors.color_DCE3D7,
        paddingVertical: vh(5)
    },
    timeContainer: {
        alignSelf: "center",
        marginTop: vh(15),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    timeContainerSlotPassed: {
        alignSelf: "center",
        marginTop: vh(15),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.color_DCE3D7,
        borderRadius: vw(20),
        padding: 5
    },
    slotTimeText: {
        fontSize: vw(14),
        lineHeight: vw(17),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.blackColor
    },
    slotTimeTextSlotPassed: {
        fontSize: vw(12),
        lineHeight: vw(17),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_rgba_0_0_0_7
    },
    orderBeforeContainer: {
        marginTop: vh(12),
        alignSelf: "center",
        marginBottom: vh(10)
    },
    orderBeforeText: {
        fontSize: vw(12),
        lineHeight: vw(17),
        color: colors.color_rgba_0_0_0_7,
        fontFamily: fonts.poppinsRegular,
        textAlign: "center"
    },
    orderBeforeTextSelectingSlot: {
        fontSize: vw(12),
        lineHeight: vw(17),
        color: colors.color_5A5959,
        fontFamily: fonts.poppinsSemiBold
    },
    textComponent: {
        textAlign: "center",
        padding: 15,
        fontFamily: fonts.poppinsRegular,
        color: colors.color_071731
    },
    buttonMainVIew: {
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        height: vh(40)
    },
    menuListContainer: {
        flex: 1,
        paddingHorizontal: vw(20),
    },
    selectingTimeSlotCotainer: {
        marginTop: vh(20),
        paddingHorizontal: vw(20)
    },
    selecteTimeSlotText: {
        fontSize: vw(16),
        lineHeight: vw(24),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_0A0045
    },
    eveningDeliveryOrderBeforeText: {
        fontSize: vw(12),
        lineHeight: vw(17),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_888888,
        textAlign: "center"
    },
    buttonStyle: {
        backgroundColor: colors.color_66F274,
        height: vh(44)
    },
    buttonTextStyle: {
        color: colors.splashPrimary,
        fontFamily: fonts.interSemiBold,
    },
    slotTimeContainer: {
        paddingHorizontal: vw(20),
        marginTop: vh(10)
    },
    closedWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    closeImage: {
        width: vw(160),
        height: vh(125),
        alignSelf: "center"
    },
    textClose: {
        marginTop: vh(21),
        fontSize: vw(12),
        lineHeight: vw(17),
        fontFamily: fonts.poppinsRegular,
        color: colors.blackColor
    },
    activityIndicatorWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    separatorContainer: {
        borderColor: colors.color_rgba_0_0_0_1,
        borderWidth: vw(1),
        width: width,
        height: vh(0)
    }
})