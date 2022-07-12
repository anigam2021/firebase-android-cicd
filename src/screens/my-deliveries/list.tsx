import React from 'react'
import { FlatList, Image, PixelRatio, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '@app/screens/my-deliveries/styles';
import { t } from 'i18next';
import { getImageFromURL, IMAGES } from '@app/constants/images';
import { ListProps } from '@app/utils/interface';
import utils from '@app/utils';
import { vh, vw } from '@app/constants';
import { CustomFastImage } from '@app/components';
import { selectImageVariant } from '@app/utils/image';
import FastImage from 'react-native-fast-image';
import { getDateDayMonth } from '@app/utils/common-function';
const List = (props: ListProps) => {
    const renderItem = (data: any) => {
        return (
            <View style={styles.orderItemListContainer}>
                <View style={{ backgroundColor: "#E6DCC9", width: vw(100), height: vw(100) }}>
                    <CustomFastImage
                        width={vw(100)}
                        height={vw(100)}
                        style={{
                            width: vw(100),
                            height: vw(100),
                        }}
                        source={{
                            uri: utils.commonFunctions.isNullUndefined(data.item.product.listingPicture) ? '' : selectImageVariant(PixelRatio.getPixelSizeForLayoutSize(vw(140)), data.item.product.listingPicture),
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View style={styles.foodNameContainer}>
                    <Text style={styles.foodTitleText}
                        numberOfLines={2} >{data.item.product.name}</Text>
                    <Text style={styles.quantityText}>{`${data.item.count} x`}</Text>
                </View>
            </View>
        )
    }

    const toSlot = (slot: any) => {
        let startSlot;
        let endSlot;
        if (slot[0].start === "18:00+02:00") {
            startSlot = "18:00"
        } else {
            startSlot = "16:00"
        }
        if (slot[0].end === "20:00+02:00") {
            endSlot = "20:00"
        } else {
            endSlot = "18:00"
        }
        return `${startSlot} - ${endSlot}`
    }
    return (
        <>
            <View style={styles.listWrapper}>
                <Text style={styles.dateText}>{getDateDayMonth(
                    1,
                    new Date(props.item.item.content.date).getDay(),
                    new Date(props.item.item.content.date).getMonth(),
                    new Date(props.item.item.content.date).getDate()
                )}</Text>
                <TouchableOpacity hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }} activeOpacity={0.8} onPress={() => props.onPress()}>
                    <Text style={styles.receiptText}>
                        {`${t('receipt')}`}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.boxContainer}>
                <View style={[styles.calenderContainer, { marginTop: vh(22), alignItems: "center" }]}>
                    <View>
                        <Image source={getImageFromURL(IMAGES.CALENDER_ICON)} />
                    </View>
                    <View style={styles.spaceBetweenCalenderAndText}>
                        <Text style={styles.calenderText}>{toSlot(props.item.item.content.deliverySlots)}</Text>
                    </View>
                </View>
                <View style={[styles.calenderContainer, { alignItems: "center" }]}>
                    <View >
                        <Image source={getImageFromURL(IMAGES.LOCATION_ICON)} />
                    </View>
                    <View style={styles.spaceBetweenCalenderAndText}>
                        <Text style={styles.calenderText}>{`${props.item.item.address.street} ${props.item.item.address.houseNumber}, ${props.item.item.address.postalCode}`}</Text>
                    </View>
                </View>
                {props.item.item.deliveryInstructions !== (null && "") && <View style={styles.calenderContainer}>
                    <View >
                        <Image source={getImageFromURL(IMAGES.DELEVERY_ICON)} />
                    </View>
                    <View style={[styles.spaceBetweenCalenderAndText, { marginStart: vw(8), width: vw(254) }]}>
                        <Text style={[styles.calenderText, { marginTop: -3 }]}>{props.item.item.deliveryInstructions}</Text>
                    </View>
                </View>
                }
                <View style={{ marginTop: vh(14) }}>
                    <FlatList
                        data={props.item.item.content ? props.item.item.content.items : ""}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(value, index) => index.toString()}
                    />
                </View>
            </View>
        </>

    )
}


export default List