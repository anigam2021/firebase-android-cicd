import * as React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { vh, vw } from '@app/constants/dimension';
import { appConstants } from '@app/constants';
import { ClickableImageProps } from '@app/utils/interface';
export function ClickableImage(props: ClickableImageProps) {
    return (
        <TouchableOpacity
            style={[styles.bttn, props.buttonStyle]}
            onPress={props._onPress}
            activeOpacity={appConstants.ACTIVE_OPACITY}
            hitSlop={props._hitSlop}
        >
            <Image
                resizeMode={props._resizeMode}
                resizeMethod={'resize'}
                source={props._imagePath}
                style={[styles.img, props.imageStyle]}
            />
        </TouchableOpacity>
    );
}
ClickableImage.defaultProps = {
    _resizeMode: 'center'
}
const styles = StyleSheet.create({
    img: {
        width: vh(24),
        height: vh(24)
    },
    bttn: {
        width: vw(24),
        height: vh(35)
    },
})