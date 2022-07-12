import React, { FC } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from "./styles";
import { getImageFromURL, IMAGES } from "@app/constants/images";
import { AppHeaderProps } from "@app/utils/interface";



const AppHeader: FC<AppHeaderProps> = function (props) {
    const LeftView = () => (
        <View style={[styles.leftView, { flex: props.flex }, props.leftIconWrapperStyle]}>
            {props.menu && <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={styles.hitSlop}
                onPress={props.menuPress}>
                <Feather name={props.menu} size={props.iconSize || 18} color={props.iconColor || '#fff'} />
            </TouchableOpacity>}
            {props.left && <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={styles.hitSlop}
                onPress={props.leftPress}
            >
                <AntDesign name={props.left} size={props.iconSize || 18} color={props.iconColor || "#fff"} />
            </TouchableOpacity>
            }
        </View>
    )

    const RightView = () => (
        <View style={[styles.rightView, { flex: props.flex }]}>
            {props.rightComponent &&
                <TouchableOpacity
                    activeOpacity={0.8}
                    hitSlop={styles.hitSlop}
                    onPress={props.rightPress}>
                    <Image
                        source={props.rightIcon ? props.rightIcon : getImageFromURL(IMAGES.CART)}
                        style={styles.cartIcon}
                    />
                    {props.basketCount === 0 ? null :
                        <View style={styles.cartCountContainer}>
                            <Text style={styles.cartCountText}>{props.basketCount}</Text>
                        </View>
                    }

                </TouchableOpacity>}
        </View>
    )


    const CenterView = () => (
        <View
            style={styles.centerView}>
            <Text style={[props.titleStyle,
            {
                textAlign: props.titleAlign || 'center',
                color: props.iconColor || 'white'
            }]}>
                {props.title}
            </Text>
        </View>
    )


    return (
        <View style={[styles.container, { backgroundColor: props.headerBg, height: props.height }, { ...props.mainContainer }]}>
            <LeftView />
            <CenterView />
            <RightView />
        </View>
    )
}
AppHeader.defaultProps = {
    basketCount: 0
}

export default AppHeader