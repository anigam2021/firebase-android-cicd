import { getImageFromURL, IMAGES } from '@app/constants/images';
import React from 'react'
import { Text, TouchableOpacity, Modal, Image, View, ActivityIndicator } from 'react-native'
import PrimaryButton from '@app/components/custom-button/index';
import { styles } from '@app/components/bottom-popup/styles'
import { BottomPopUpProps } from '@app/utils/interface';
import { vh, vw } from '@app/constants';
const BottomPopUp = (props: BottomPopUpProps) => {
    return (
        <Modal
            animationType="none"
            visible={props.visible}
            transparent={true}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.modalContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.secondModalContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={props.ButtonPressCross}
                        style={{ alignSelf: "flex-end" }}
                        hitSlop={styles.hitSlop}
                    >
                        <Image
                            style={styles.crossImage}
                            source={getImageFromURL(IMAGES.CROSS_LOGO)}
                        />
                    </TouchableOpacity>
                    <View style={{
                        paddingHorizontal: vw(8),
                    }}>
                        <Text style={[styles.headerTextStyles, props.headerTextStyles]}>
                            {props.headerText}
                        </Text>
                        {props.activityIndicator && <View>
                            <ActivityIndicator size={"large"} color={"#135B2C"} style={{ marginTop: 40 }} />
                        </View>
                        }
                        {
                            !!props.headerText2 &&
                            <Text style={[styles.headerTextStyles, props.headerTextStyles]}>
                                {props.headerText2}
                            </Text>
                        }
                    </View>

                    <View style={{
                        marginVertical: vh(40),
                    }}>
                        <Text style={[styles.messageTextStyles, props.messageTextStyles]}>
                            {props.messageText1}
                        </Text>
                        {
                            !!props.messageText2 &&
                            <Text style={[styles.messageTextStyles, props.messageTextStyles]}>
                                {props.messageText2}
                            </Text>
                        }
                        {
                            !!props.messageText3 &&
                            <Text style={[styles.messageTextStyles, props.messageTextStyles]}>
                                {props.messageText3}
                            </Text>
                        }
                        {
                            !!props.messageText4 &&
                            <Text style={[styles.messageTextStyles, props.messageTextStyles]}>
                                {props.messageText4}
                            </Text>
                        }

                    </View>
                    <PrimaryButton
                        title={props.buttonTitle}
                        touchablestyle={[styles.buttonStyle, props.buttonStyle]}
                        textstyle={[styles.buttonTextStyle, props.buttonTextStyle]}
                        onPress={props.ButtonPress}
                        isLoading={props.isLoading}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal >
    )
}

export default BottomPopUp;