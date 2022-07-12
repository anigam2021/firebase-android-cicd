import {
    StyleSheet
} from 'react-native';

import {colors, vh} from '@app/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.splashPrimary,
        alignItems : "center",
        justifyContent : "center"
    },
    eatchLogoContainer: {
        alignSelf: "center",
        marginTop: vh(45)
    },
    splashTextContainer: {
        marginTop: vh(22),
        alignSelf: "center"
    },
    splashText: {
        fontSize: 16,
        textAlign: "center",
        color: colors.color_071731
    },
    splashMainImageContainer: {
    },
    splashImage: {
        height: 60,
        width: 231
    },
})