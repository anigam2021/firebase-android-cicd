import { StyleSheet } from 'react-native';
import { colors, vh, vw, fonts } from '@app/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: vw(20),
    },
    addressContainer: {
        paddingLeft: vw(6.67)
    },
    headerMainContainer: {
        marginTop: vh(30)
    },
    headerTitleStyle: {
        fontSize: vw(18),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_071731
    },
    listContainer: {
        marginLeft: vw(1),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textAndLeftIconWrapper: {
        paddingVertical: vh(25),
        flexDirection: "row",
        alignItems: "center",
    },
    textWrapper: {
        marginLeft: vw(14),
        color: colors.color_1B194B,
        fontFamily: fonts.poppinsMedium,
        fontSize: vw(14),
        lineHeight: vw(16),
        paddingTop: 5
    },
    bottomLineStyle: {
        borderBottomColor: colors.color_rgba_0_0_0_1,
        borderBottomWidth: vw(1)
    },
    bottomView: {
        position: "absolute",
        alignSelf: "center",
        bottom: vh(30)
    },
    versionStyle: {
        color: colors.color_1B194B,
        fontSize: vw(14),
        fontWeight: '500',
        fontFamily: fonts.poppinsMedium,
    },
});
