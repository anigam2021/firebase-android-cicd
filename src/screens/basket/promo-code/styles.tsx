import { StyleSheet } from 'react-native';
import { colors, vh, vw, fonts } from '@app/constants';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    addressContainer: {
        flex: 1,
        paddingHorizontal: vw(20)
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
    titleText: {
        position: "absolute",
        height: vh(17),
        marginTop: vh(-15),
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(10),
        display: "flex",
        alignItems: "center",
        color: colors.color_1B194B,
    },
    textInput: {
        color: colors.color_1B194B,
        fontFamily: fonts.poppinsRegular,
        height: vh(30),
        marginTop: vh(0),
        paddingVertical: 0,
        fontSize: vw(14),
        lineHeight: vw(17),
        borderWidth: 0,
        width: vw(340),
        marginStart: vh(-5),
        paddingStart: vh(5),
        borderBottomColor: colors.color_rgba_0_0_0_1,
        borderBottomWidth: vw(1),
    },
    buttonStyle: {
        backgroundColor: colors.color_66F274,
        height: vh(50),
        width: vw(335),
        position: "absolute",
        alignSelf: "center"
    },
    buttonTextStyle: {
        color: colors.splashPrimary,
        fontFamily: fonts.interSemiBold,
    },

});