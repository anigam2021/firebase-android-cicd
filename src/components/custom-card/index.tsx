import React, { FC } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    FlatList
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomFastImage } from "@app/components";
import { colors, vw, vh, appConstants } from '@app/constants';
import { styles } from './styles';
import { ClickableImage } from '../clickable-image';
import utils from '@app/utils';
import { getImageFromURL, IMAGES } from '@app/constants/images';
import { CheckoutAddressDeliveryCardProps, DeliverySlotCheckoutProps, MenuDateAndTimeCardProps, MenuItemProps, TimeSlotMenuProps } from '@app/utils/interface';
export const MenuDateAndTimeCard: FC<MenuDateAndTimeCardProps> = (props: MenuDateAndTimeCardProps) => {
    const {
        date,
        day,
        isSelected,
        onPress,
        validDate,
        isValidButClosed
    } = props;
    const toDecideBg = () => {
        let colorToShow = colors.color_DCE3D7;
        if (isSelected) {
            colorToShow = colors.primary
        }
        else {
            colorToShow = colors.color_DCE3D7
        }
        return colorToShow
    }
    const toDecideTxtColor = () => {
        let colorToShow = colors.color_rgba_0_0_0_4;
        if (isSelected) {
            colorToShow = colors.blackColor
        }
        else {
            if (validDate && isValidButClosed) {
                colorToShow = colors.color_rgba_0_0_0_4
            }
            else if (!validDate) {
                colorToShow = colors.color_rgba_0_0_0_4
            }
            else if (!isValidButClosed) {
                colorToShow = colors.color_rgba_0_0_0_7
            }

        }
        return colorToShow
    }
    const selectFontSize = () => {
        let fontSize = vw(18);
        if (isSelected) {
            fontSize = vw(18)
        }
        else {
            fontSize = vw(16)
        }
        return fontSize;
    }
    const selectLineHeight = () => {
        let lineHeight = vw(18);
        if (isSelected) {
            lineHeight = vw(27)
        }
        else {
            lineHeight = vw(24)
        }
        return lineHeight;
    }
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={!validDate}
            onPress={() => onPress()}
            style={[styles.menuDateAndDayContainer, {
                backgroundColor: toDecideBg()
            }]}>
            <Text style={[styles.menuDayText, {
                color: toDecideTxtColor()
            }]}>{day}</Text>
            <Text style={[styles.menuDateText, {
                color: toDecideTxtColor(),
                fontSize: selectFontSize(),
                lineHeight: selectLineHeight()
            }]}>{date}</Text>
        </TouchableOpacity>
    )
}


export const MenuItem: FC<MenuItemProps> = (props: MenuItemProps) => {
    const {
        menuImage,
        menuTitle,
        menuSummary,
        // menuCategory,
        quantitySelected,
        onPressIncr,
        onPressDcr,
        currentItem,
        loading,
        dynamicStyle,
        dynamicSubStyle,
        base,
        exponent,
        onPressTitle,
        slotPassed,
        soldOut,
        soldOutText
    } = props

    const renderItem = (item: any) => {
        return (
            item.index < 2 &&
            <TouchableOpacity activeOpacity={1} style={styles.menuCategoryContainer}>
                <Text style={styles.tagTextColor}>{(item.item.name).toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.menuItemContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onPressTitle()}
                style={styles.menuImageContainer}>
                <CustomFastImage
                    style={styles.menuImage}
                    width={vw(140)}
                    height={vw(140)}
                    source={{
                        uri: menuImage,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </TouchableOpacity>
            <View style={styles.menuDataContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onPressTitle()}
                >
                    <Text style={styles.menuTitleText} numberOfLines={2}>{menuTitle}</Text>
                    <Text style={styles.menuDataText} numberOfLines={2}>{menuSummary}</Text>
                    {/* <TouchableOpacity activeOpacity={1} style={styles.menuCategoryContainer}> */}
                    <FlatList
                        data={props.currentItem.tags}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                    />
                    {/* <Text style={[styles.menuCategoryText]}>{menuCategory && menuCategory.toUpperCase()}</Text> */}
                    {/* </TouchableOpacity> */}
                </TouchableOpacity>
                <View style={styles.priceAndAddContainer}>
                    {/* <Text style={styles.menuPriceText}>€{menuPrice}</Text> */}
                    <View style={styles.mainWrapperSubscript}>
                        <View>
                            <Text style={[utils.commonStyles.baseStyle, dynamicStyle]}>{base + ","}</Text>
                        </View>
                        <View>
                            <Text style={[utils.commonStyles.exponentStyle, dynamicSubStyle]}>{exponent}</Text>
                        </View>
                    </View>
                    {
                        !slotPassed &&
                        (soldOut ?
                            <View style={styles.soldOutContainer}>
                                <Text numberOfLines={1} style={styles.soldOuTText}>{soldOutText}</Text>
                            </View>
                            :
                            (
                                loading ?
                                    <View style={{
                                        width: vw(72), alignItems: "center",
                                        justifyContent: "center",
                                        height: vh(24)
                                    }}>
                                        <ActivityIndicator color={colors.splashPrimary} size="small" />
                                    </View>
                                    :
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        {quantitySelected === 0 ? null :
                                            <>
                                                <ClickableImage
                                                    _imagePath={getImageFromURL(IMAGES.MINUS_ICON)}
                                                    _onPress={() => onPressDcr(currentItem, quantitySelected)}
                                                    buttonStyle={styles.wrapperClickableImage}
                                                    _hitSlop={appConstants.HIT_SLOPE}
                                                />
                                                <Text style={styles.textQuantity}>{quantitySelected}</Text>
                                            </>
                                        }
                                        <ClickableImage
                                            _imagePath={getImageFromURL(IMAGES.PLUS_ICON)}
                                            _onPress={() => onPressIncr(currentItem, quantitySelected)}
                                            buttonStyle={styles.wrapperClickableImage}
                                            _hitSlop={appConstants.HIT_SLOPE}
                                        />
                                    </View>
                            )
                        )
                    }
                </View>
            </View>
        </View>
    )
}
MenuItem.defaultProps = {
    onPressIncr: () => {
        //Default overriding.
    },
    onPressDcr: () => {
        //Default overriding.
    }
}

export const TimeSlotMenu: FC<TimeSlotMenuProps> = (props: TimeSlotMenuProps) => {
    const {
        isSelected,
        slotTime,
        onPress,
        isValidNow
    } = props
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => isValidNow ? onPress() : null}
            style={styles.timeSlotMenuContainer}
        >
            <Text style={[styles.slotTimeText, { opacity: isValidNow ? 1 : 0.3 }]}>{slotTime}</Text>
            <View style={[styles.timeSlotMenuSelector, {
                borderColor: isSelected ? colors.splashPrimary : colors.color_rgba_19_91_44_32,
                opacity: isValidNow ? 1 : 0.3
            }]}>
                {
                    isSelected ? <View style={styles.timeSlotMenuSelected} /> : null
                }
            </View>
        </TouchableOpacity>
    )
}


export const DeliverySlotCheckout: FC<DeliverySlotCheckoutProps> = (props: DeliverySlotCheckoutProps) => {
    const { title, renderDeliverySlot } = props;

    return (
        <>
            <View style={styles.deliverySlotContainer}>
                <View style={styles.checkoutImageContainer}>
                    <Image
                        source={getImageFromURL(IMAGES.CALENDER_ICON)}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.delvierySlotText}>{title}</Text>
            </View>
            <View style={{ marginTop: vh(4) }}>
                {
                    renderDeliverySlot()
                }
            </View>

        </>
    )
}



export const CheckoutAddressDeliveryCard: FC<CheckoutAddressDeliveryCardProps> = (props: CheckoutAddressDeliveryCardProps) => {
    const { image, title, subTitle, onPress, bankLogoImage } = props;
    return (
        <TouchableOpacity onPress={() => onPress()} activeOpacity={0.8}>
            <View style={styles.imageAndTitleAndEditContainer}>
                <View style={styles.imageAndTitleContainer}>
                    <View style={styles.checkoutImageContainer}>
                        <Image
                            source={image}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <Image
                    source={getImageFromURL(IMAGES.EDIT_ICON)}
                />
            </View>
            <View style={styles.subTextTitleContainer}>
                {bankLogoImage && <Image source={bankLogoImage} />}
                <Text style={[styles.subTitleText, {
                    // marginStart: vw(49),
                }]}
                    numberOfLines={1}>{subTitle}</Text>
            </View>

        </TouchableOpacity>
    )
}