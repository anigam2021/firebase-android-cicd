import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Image,
    PixelRatio
} from 'react-native';
import {
    useDispatch,
    connect
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment-timezone';
import { worldClock, diffYMDHMS } from './helper';
import { vw, colors, screens, fonts, vh, firebase } from '@app/constants';
import { styles } from '@app/screens/menu/menu/styles';
import {
    MenuDateAndTimeCard,
    MenuItem,
    TimeSlotMenu,
    PrimaryHeader,
    PrimaryButton,
} from '@app/components';
import {
    setSelectedTimeSlotForSelectedDeliverySlot,
    setUpdatedTimeSlotForSelectedDay,
    setSelectedDayDeliverySlot,
    increaseDecreaseProductBasketQuantity,
    setMealOverViewData
} from '@app/screens/menu/menu/menuAction/menuAction';
import utils from '@app/utils';
import { selectImageVariant } from '@app/utils/image';
import { fetchBasketList } from '@screen/basket/basketAction/basketAction';
import { ShowActivityIndicator } from '@app/components/activity-indicator';
import types from '@app/screens/menu/menu/menuAction/types';
import basketTypes from "@screen/basket/basketAction/types";
import Separator from '@app/components/custom-seperator';
import { getImageFromURL, IMAGES } from '@app/constants/images';
import { currentDate, CurrentItems, MenuItems, MenuProps, TimeSlot } from '@app/utils/interface';
import { fetchCheckoutData } from '../../contact/contactAction/checkoutAction';
import {  setCurrentScreen, logEvent } from "@app/utils/firebase";


const Menu = (props: MenuProps) => {
    const { t } = useTranslation();
    const [selectedDateAndDayIndex, setSelectedDayAndDateIndex] = useState<number>(props.menuReducer.selectedDateIndex)
    const [selectingTimeSlot, setSelectingTimeSlot] = useState<boolean>(false)
    const [managingQuntityIndex, setManagingQuntityIndex] = useState<number>(0)
    const flatlistRef = useRef<FlatList>(null);
    const dispatch = useDispatch()
    useEffect(() => {
        setCurrentScreen(screens.menu.menu.name,screens.menu.menu.title )
        
        dispatch({
            type: types.HANDLE_MENU_LOADER,
            isLoading: true
        })
        dispatch(fetchBasketList(true, null))
        dispatch(fetchCheckoutData(false))
    }, []);

    const toFindIndexOfCurrentDate = () => {
        let currentDateIndex = 0
        props.menuReducer.menuList.map((item: currentDate, index: number) => {
            if (new Date(item.date).getDate() === new Date().getDate()) {
                currentDateIndex = index
            }
        })
        return currentDateIndex
    }
    const renderDateAndTime = ({ item, index }: { item: currentDate, index: number }) => {
        const d = new Date(item.date);
        const dayName = d.toString().split(' ')[0];
        const monthName = d.toString().split(' ')[1];
        const dateValue = d.toString().split(' ')[2];
        const translatedMonth = t(`${monthName}`)
        return (
            <View>
                <MenuDateAndTimeCard
                    date={`${dateValue} ${translatedMonth}`}
                    day={t(`${dayName}`)}
                    isSelected={selectedDateAndDayIndex === index ? true : false}
                    onPress={() => {
                        props.menuReducer.pullOnRefreshLoader ? "" : (
                            setSelectedDayAndDateIndex(index),
                            setSelectingTimeSlot(false),
                            props.menuReducer.menuList.length > 0 && flatlistRef.current?.scrollToIndex({
                                animated: true,
                                index,
                                viewPosition: 0.5,
                            }),
                            !item?.closed &&
                            dispatch(setSelectedDayDeliverySlot(index))

                        )
                    }}
                    validDate={(index >= toFindIndexOfCurrentDate()) ? true : false}
                    isValidButClosed={(item?.closed)}
                />
            </View>
        )
    }

    const handleIncreaseDecreasedQuantity = (currentItem: any, increment: boolean) => {
        const slotWhereItemIsGoingToAdd = props.menuReducer.selectedDayDeliverySlots.find((item: any) => item.name === props.menuReducer.selectedDeliverySlotName)
        if (!slotWhereItemIsGoingToAdd.isvalidNow) {
            setSelectingTimeSlot(true)
        } else {
            if (props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}`) {
                manageProductBasketQuantity(currentItem, increment)
            }
        }
    }

    const manageProductBasketQuantity = (currentItem: CurrentItems, increment: boolean) => {
        dispatch({
            type: basketTypes.HANLDE_LOADER_ADD_REMOVE_BASKET,
            isLoading: true
        })
        const payload = {
            selectedDayIndex: selectedDateAndDayIndex,
            id: currentItem.id,
            increment: increment,
            variant: currentItem.variants.variants[0].code
        }
        dispatch(increaseDecreaseProductBasketQuantity(payload))
    }

    const renderMenuItems = ({ item, index }: { item: MenuItems, index: number }) => {
        const itemPrice = item.variants.variants[0].price.toLocaleString("nl-US", { minimumFractionDigits: 2 })
        return (
            <View>
                <MenuItem
                    currentItem={item}
                    menuTitle={item.name}
                    menuSummary={item.summary}
                    menuImage={utils.commonFunctions.isNullUndefined(item.listingPicture) ? '' : selectImageVariant(PixelRatio.getPixelSizeForLayoutSize(vw(140)), item.listingPicture)}
                    menuCategory={`${t("vg")}`}
                    base={`€${itemPrice.split(",")[0]}`}
                    exponent={`${itemPrice.split(",")[1]}`}
                    quantitySelected={item.count}
                    onPressIncr={() => { props.menuReducer.pullOnRefreshLoader ? "" : (setManagingQuntityIndex(index), handleIncreaseDecreasedQuantity(item, true)) }}
                    onPressDcr={() => { props.menuReducer.pullOnRefreshLoader ? "" : (setManagingQuntityIndex(index), handleIncreaseDecreasedQuantity(item, false)) }}
                    loading={managingQuntityIndex === index && props.basketReducer.isLoading}
                    dynamicStyle={{
                        fontSize: vw(16),
                        lineHeight: vw(20),
                        color: colors.color_rgba_0_0_0_7,
                        fontFamily: fonts.poppinsSemiBold
                    }}
                    dynamicSubStyle={{
                        fontFamily: fonts.poppinsSemiBold,
                        fontSize: vw(10)
                    }}
                    onPressTitle={() => {
                        const data = {
                            ...item,
                            deliverySlot: props.menuReducer.selectedDeliverySlotName,
                            date: props.menuReducer.menuList[selectedDateAndDayIndex].date
                        }
                        props.menuReducer.pullOnRefreshLoader ? "" : dispatch(setMealOverViewData(data))
                    }}
                    slotPassed={props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}` ? false : true}
                    soldOutText={t("soldOut")}
                    soldOut={item?.limitedAvailability === 0 ? true : false}
                />
            </View>
        )
    }
    const onPressBasketIcon = () => {
        props.navigation.navigate(screens.basket.basket.name)
    }
    const renderTimeSlotView = () => {

        return (
            selectingTimeSlot ?
                <>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.selectingTimeSlotCotainer}
                    >
                        <Text style={styles.selecteTimeSlotText}>{t("selectedTimeSlotForDelviery")}</Text>
                    </TouchableOpacity>
                    <View style={styles.slotTimeContainer}>
                        <FlatList
                            data={props.menuReducer.selectedDayDeliverySlots}
                            renderItem={renderTimeSlot}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </>
                :
                (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (props.menuReducer.pullOnRefreshLoader) {
                                    return ""
                                }
                                else {
                                    if (props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}`) {
                                        setSelectingTimeSlot(true)
                                    }
                                }
                            }}
                            style={props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}` ? styles.timeContainer : styles.timeContainerSlotPassed}>
                            <Text style={
                                props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}` ?
                                    [styles.slotTimeText, {
                                        marginEnd: vw(5)
                                    }] :
                                    styles.slotTimeTextSlotPassed}>
                                {props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}` ?
                                    props.menuReducer.selectedTimeSlot :
                                    t("orderingForTodayIsNotAllowed")
                                }
                            </Text>
                            {
                                props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}` &&
                                <FontAwesome
                                    name="caret-down"
                                    size={vw(20)}
                                    color={colors.blackColor}
                                />

                            }

                        </TouchableOpacity>
                        {
                            props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}` &&
                            <Text style={styles.orderBeforeText}>{t('orderBefore')} {props.menuReducer.orderBefore.split(" ").length == 2 ? t(props.menuReducer.orderBefore.split(" ")[0]) + " " + props.menuReducer.orderBefore.split(" ")[1] : props.menuReducer.orderBefore}</Text>
                        }

                    </>
                )
        )
    }
    const renderTimeSlot = ({ item, index }: { item: TimeSlot, index: number }) => {
        const startTime = item.start.toString().split('+')[0];
        const endTime = item.end.toString().split('+')[0];
        const tempCutOffTime = item.cutoff.toString().split('T')[1];
        const cutOffHour = tempCutOffTime.toString().split(':')[0];
        const cutOffMin = tempCutOffTime.toString().split(':')[1];
        const currentTime = worldClock(1, "Europe", null)
        const cutOffInMoment = moment(item.cutoff)
        const currentTimeAmsMoment = moment(currentTime);

        const { seconds } = diffYMDHMS(cutOffInMoment, currentTimeAmsMoment)

        return (
            <TimeSlotMenu
                slotTime={item?.limitedAvailability !== 0 ?
                    `${startTime} -${endTime} (${t("orderBefore")} ${cutOffHour}:${cutOffMin})`
                    :
                    `${startTime} -${endTime} (${t('soldout')})`
                }
                isSelected={item.isSelected}
                onPress={() => {
                    props.menuReducer.pullOnRefreshLoader ? "" :
                        dispatch(setSelectedTimeSlotForSelectedDeliverySlot(index))
                }}
                isValidNow={(seconds >= 0 ? (item?.limitedAvailability === 0 ? false : true) : false)}
            />
        )
    }
    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <View style={styles.dataContainer}>
                    <View style={styles.headerContainer}>
                        <PrimaryHeader
                            menu={"menu"}
                            iconSize={vw(25)}
                            iconColor={colors.blackColor}
                            rightComponent
                            menuPress={() => {
                                props.menuReducer.pullOnRefreshLoader ? "" :
                                    props.navigation.navigate(screens.account.account.name)
                            }}
                            rightPress={() => props.menuReducer.pullOnRefreshLoader ? "" : onPressBasketIcon()}
                            basketCount={props.basketReducer.basketCount}
                        />
                    </View>
                </View>
                <View
                    onLayout={() => {
                        props.menuReducer.menuList.length > 0 && flatlistRef.current?.scrollToIndex({ animated: false, index: 1, viewPosition: 0.45 });
                    }}
                    style={styles.dateContainer}>
                    <FlatList
                        data={props.menuReducer.menuList}
                        renderItem={renderDateAndTime}
                        ref={flatlistRef}
                        onScrollToIndexFailed={(error) => {
                            flatlistRef.current?.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item: any, index: number) => index.toString()}
                    />
                </View>
                {!props.menuReducer.menuList[selectedDateAndDayIndex]?.closed && !props.menuReducer.isLoading && renderTimeSlotView()}
                {

                    selectingTimeSlot && !props.menuReducer.isLoading &&
                    <View style={styles.selectingTimeSlotCotainer}>
                        <PrimaryButton
                            title={t("apply")}
                            touchablestyle={styles.buttonStyle}
                            textstyle={styles.buttonTextStyle}
                            onPress={() => {
                                props.menuReducer.pullOnRefreshLoader ? "" : (
                                    setSelectingTimeSlot(false),
                                    dispatch(setUpdatedTimeSlotForSelectedDay(props.menuReducer.selectedDayDeliverySlots, selectedDateAndDayIndex)))
                            }}
                        />
                    </View>
                }
                {props.menuReducer.isLoading ?
                    <ShowActivityIndicator />
                    :
                    props.menuReducer.menuList[selectedDateAndDayIndex]?.closed ? <View style={styles.closedWrapper}>
                        <Image source={getImageFromURL(IMAGES.CLOSED_LOGO)} style={styles.closeImage} />
                        <Text style={styles.textClose}>{t('closedMessage')}</Text>
                    </View> :
                        <View style={[styles.menuListContainer, {
                            marginTop: selectingTimeSlot ? vh(40) : vh(15)
                        }]}>
                            <FlatList
                                data={props.menuReducer.selectedDayProducts}
                                renderItem={renderMenuItems}
                                ItemSeparatorComponent={() => <Separator separatorContainer={styles.separatorContainer} />}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                refreshing={props.menuReducer.pullOnRefreshLoader}
                                onRefresh={() => {
                                    let LogEvent = {
                                        email: props.email,
                                        eventType: firebase.analtyics.ANALYTICS_MENU_REFRESH_LIST,
                                        eventMessage: "menu list refresh"
                                    }
                                    logEvent(firebase.analtyics.ANALYTICS_MENU_REFRESH_LIST, LogEvent)
                                    dispatch({
                                        type: types.PULL_ON_REFRESH_LOADER,
                                        pullOnRefreshLoader: true
                                    })
                                    dispatch(fetchBasketList(true, null));
                                }}

                            />
                        </View>}
            </SafeAreaView>
        </>
    )
}

function mapStateToProps(state: any) {
    const { menuReducer, basketReducer, authReducer } = state
    return {
        menuReducer,
        basketReducer,
        email: authReducer.loginEmail
    }
}

export default connect(
    mapStateToProps,
    null
)(Menu)
