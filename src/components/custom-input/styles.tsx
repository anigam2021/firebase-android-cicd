import React from 'react';
import {
    StyleSheet
} from 'react-native';

import { vw, vh, colors, fonts } from '../../constants';

export const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        borderRadius: vw(8),
        width: "100%",
        // paddingHorizontal: vw(20),
        // paddingVertical: vh(20),
        fontSize: vw(12),
        borderColor: colors.color_071731,
        fontFamily: fonts.poppinsMedium,
        color: colors.color_333333
    },
    container: {
        flex: 1,
    },
    titleText: {
        height: vh(17),
        fontFamily: fonts.poppinsMedium,
        fontSize: vw(10),
        lineHeight: vw(16),
        display: "flex",
        alignItems: "center",
        color: colors.color_1B194B,
    }
})