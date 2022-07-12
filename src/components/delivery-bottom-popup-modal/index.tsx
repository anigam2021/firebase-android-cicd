import { getImageFromURL, IMAGES } from '@app/constants/images';
import React from 'react'
import { Text, TouchableOpacity, Modal, Image, View, FlatList } from 'react-native'
import { styles } from '@app/components/delivery-bottom-popup-modal/styles'
import { BottomPopUpProps, BottomPopUpPropsForUpdateDelivery } from '@app/utils/interface';
import { colors, vh, vw } from '@app/constants';
import { getDateDayMonth } from "@app/utils/common-function";
import {
    PrimaryButton,
    TimeSlotMenu,
} from "@app/components";
import moment from 'moment';
import utils from '@app/utils';
import { t } from "i18next";
export const DeliverySlotChangePopUpModal = (props: BottomPopUpProps) => {
    const renderTimeSlotView = (item: any) => {
        const startTime = item.item.start.split('+')[0]
        const endTime = item.item.end.split('+')[0]
        const tempCutOffTime = item.item.cutoff.toString().split('T')[1];
        const cutOffHour = tempCutOffTime.toString().split(':')[0];
        const cutOffMin = tempCutOffTime.toString().split(':')[1];
        const currentTime = utils.commonFunctions.worldClock(1, "Europe", null)
        const cutOffInMoment = moment(item.item.cutoff)
        const currentTimeAmsMoment = moment(currentTime);
        const { seconds } = utils.commonFunctions.diffYMDHMS(cutOffInMoment, currentTimeAmsMoment)
        return (
            <View style={{
                paddingHorizontal: vw(20),
            }}>
                <TimeSlotMenu
                    slotTime={item.item?.limitedAvailability !== 0 ?
                        `${startTime} - ${endTime} (${t("orderBefore")} ${cutOffHour}:${cutOffMin})`
                        : `${startTime} - ${endTime} (${t('soldout')})`
                    }
                    //{`${startTime} - ${endTime} (${t("orderBefore")} ${cutOffHour}:${cutOffMin})`}
                    isSelected={item.item.isSelected}
                    onPress={() => {
                        props.onPress(item.item.name)
                    }}
                    isValidNow={(seconds >= 0 ? (item.item?.limitedAvailability === 0 ? false : true) : false)}
                />
            </View>
        )
    }
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
                        style={styles.crossButtonContainer}
                        hitSlop={styles.hitSlop}
                    >
                        <Image
                            style={styles.crossImage}
                            source={getImageFromURL(IMAGES.CROSS_LOGO)}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.headerTextStyles, props.headerTextStyles]}>
                            {props.headerText}
                        </Text>
                    </View>
                    <View style={{
                        marginVertical: vh(40),
                    }}>
                        <Text style={[styles.messageTextStyles, props.messageTextStyles]}>
                            {props.messageText1}
                        </Text>
                        <Text style={[styles.messageTextStyles, props.messageTextStyles]}>
                            {props.messageText2}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: colors.color_DCE3D7 }}>
                        <Text style={styles.dayDateAndMonth}>{props.dayDateAndMonth}</Text>
                    </View>
                    <View style={{
                        marginTop: 15,
                        marginBottom: 18
                    }}
                    >
                        {props.slotData && props.slotData.length > 0 &&
                            <FlatList
                                data={props.slotData}
                                renderItem={renderTimeSlotView}
                            />
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


export const DeliveryUpdatePopUpModal = (props: BottomPopUpPropsForUpdateDelivery) => {
    const renderTimeSlotView = (item: any) => {
        return (
            <View style={{ backgroundColor: colors.color_DCE3D7, marginBottom: 4 }}>
                {/* <Text style={styles.dayDateAndMonth}>{item.item.date}</Text> */}
                <Text style={styles.dayDateAndMonth}>{getDateDayMonth(
                    1,
                    new Date(item.item.date).getDay(),
                    new Date(item.item.date).getMonth(),
                    new Date(item.item.date).getDate()
                )}</Text>
            </View>
        )
    }
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
                        style={styles.crossButtonContainer}
                        hitSlop={styles.hitSlop}
                    >
                        <Image
                            style={styles.crossImage}
                            source={getImageFromURL(IMAGES.CROSS_LOGO)}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.headerTextStyles, props.headerTextStyles]}>
                            {props.headerText}
                        </Text>
                    </View>
                    <View style={{
                        marginVertical: vh(40),
                    }}>
                        <Text style={[styles.messageTextStyles, props.messageTextStyles]}>
                            {props.messageText1}
                        </Text>
                    </View>
                    <View style={{
                        marginBottom: 40,
                    }}
                    >
                        {props.listData.length > 0 && <FlatList
                            data={props.listData}
                            renderItem={renderTimeSlotView}
                        />}
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
