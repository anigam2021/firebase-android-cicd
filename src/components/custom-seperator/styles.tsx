import { StyleSheet } from 'react-native';
import { colors, vh, vw, } from '@app/constants';
import { width } from '@app/constants/dimension';
export const styles = StyleSheet.create({
    separatorContainer: {
        borderColor: colors.color_rgba_0_0_0_1,
        borderWidth: vw(1),
        width: width,
        height: vh(0)
    }

});