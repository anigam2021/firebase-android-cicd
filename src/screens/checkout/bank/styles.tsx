import { StyleSheet } from 'react-native';
import { colors, vh, vw, fonts } from '@app/constants';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: vh(20),
    },
    addressContainer: {
        paddingLeft: vw(6.67)
    },
    headerMainContainer: {
        marginTop: vh(30),
    },
    headerTitleStyle: {
        fontSize: vw(18),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_071731
    },
    flatListWrapper: {
        marginTop: vh(43)
    },
    listContainer: {
        marginLeft: vw(1),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textWrapper: {
        marginLeft: vw(14),
        color: colors.color_1B194B,
        display: "flex",
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(13),
        lineHeight: vw(16),
        paddingVertical: vh(15),
    },
    separatorContainer: {
        borderBottomColor: colors.color_rgba_0_0_0_1,
        borderBottomWidth: vw(1)
    },
    flatlistContainer: {
        marginTop: vh(29),
        flex: 1
    }
});