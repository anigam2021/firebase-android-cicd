import { colors } from '@app/constants';
import { CustomButtonProps } from '@app/utils/interface';
import React, { FC } from 'react';
import { TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import styles from './style'


const PrimaryButton: FC<CustomButtonProps> = (props: CustomButtonProps) => {
    const {
        isLeft,
        isRight,
        onPress,
        imageLeft,
        touchablestyle,
        textstyle,
        imageRight,
        title,
        imageLeftStyle,
        imageRightStyle,
        activeopacity,
        isdisabled,
        onlongpress,
        onfocus,
        onblur,
        isLoading
    } = props;
    return (
        <TouchableOpacity
            style={[styles.buttonStyle, touchablestyle]}
            onPress={onPress}
            activeOpacity={activeopacity}
            disabled={isdisabled}
            onLongPress={onlongpress}
            onFocus={onfocus}
            onBlur={onblur}
        >
            {isLeft &&
                <Image source={imageLeft} style={imageLeftStyle} />
            }
            {!isLoading ?
                <Text style={[styles.textstyle, textstyle]}>{title}</Text>
                : <ActivityIndicator size="small" color={colors.color_135B2C} />}
            {isRight &&
                <Image source={imageRight} style={imageRightStyle} />
            }
        </TouchableOpacity>
    );
};
PrimaryButton.defaultProps = {
    isLeft: false,
    isRight: false,
    onPress: () => {
        //default function for the onPress
    },
    touchablestyle: styles.buttonStyle,
    textstyle: styles.textstyle,
    title: "",
    imageLeftStyle: styles.leftimage,
    imageRightStyle: styles.rightimage,
    activeopacity: 0.8,
    isdisabled: false,
    onlongpress: () => {
    }
};
export default PrimaryButton;



