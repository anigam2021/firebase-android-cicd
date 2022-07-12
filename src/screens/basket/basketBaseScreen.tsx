import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, SafeAreaView, Image, FlatList, PixelRatio, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { vh, vw, fonts, colors, screens, activeOpacity, appConstants } from "@app/constants";
import { styles } from '@screen/basket/styles'
import {
    ClickableImage,
    PrimaryButton,
    TimeSlotMenu,
    PrimaryHeader,
    CustomFastImage
} from "@app/components";
import { t } from "i18next";
import FastImage from 'react-native-fast-image';
import { useDispatch, connect } from "react-redux";
import { fetchBasketList, increaseDecreaseBasketQuantity, updateBasketQuantity, deletePromoCode } from '@screen/basket//basketAction/basketAction';
import commonFunction, { getDateDayMonth } from "@app/utils/common-function";
import utils from '@app/utils';
import { selectImageVariant } from '@app/utils/image';
import moment from 'moment-timezone';
import types from "@screen/basket/basketAction/types";
import { fetchCheckoutData } from "@screen/contact/contactAction/checkoutAction";
import { getImageFromURL, IMAGES } from "@app/constants/images";
import { BasketBaseScreenProps, DayDelivery, DayWiseFood, selectedItemProps, subBillBreakUp, SubslotsArray, TimeSlotView } from "@app/utils/interface";
import BottomPopUp from "@app/components/bottom-popup";
import { DeliverySlotChangePopUpModal, DeliveryUpdatePopUpModal } from "@app/components/delivery-bottom-popup-modal";

const BasketBaseScreen = (props: BasketBaseScreenProps) => {
    const allCasePass = React.useRef(false)
    const [showEditSlots, setShowEditSlots] = useState<boolean>(false)
    const [currentEditTapDelivery, setCurrentEditTapDelivery] = useState<any>({})
    const [managingQuntityIndex, setManagingQuntityIndex] = useState<number>(0)
    const [editingBasketDate, setEditingBasketDate] = useState<string>("")
    const [managingQuntityDayIndex, setManagingQuntityDayIndex] = useState<string>("")
    const [timeSlot, setTimeSlot] = useState<any>([])
    const [loaderForQuantity, setLoaderForQuantity] = useState(false);
    const [expiredDates, setExpiredDates] = useState<any>([])
    const [showExpiredDates, setShowExpiredDates] = useState<boolean>(false);
    const [showSoldOutMeals, setShowSoldOutMeals] = useState<boolean>(false);
    const [soldOutMeals, setSoldOutMeals] = useState<any>([])
    const [showLimitedAvailability, setShowLimitedAvailability] = useState<boolean>(false);
    const [limitedMeals, setLimitedMeals] = useState<any>([])
    const [showPassedSlot, setShowPassedSlot] = useState<boolean>(false)
    const [slotPassedData, setSlotPassedData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onPressLeftIcon = () => {
        props.navigation.goBack()
    }
    const dispatch = useDispatch()

    useEffect(() => {
        const subscribe = props.navigation.addListener("focus", () => {
            allCasePass.current = false
            // toFetchBasketList()
            dispatch(fetchBasketList(false, (basket: any) => {
                verifyPassedDates(basket)
            }))
        })

        // fetchCheckout
        dispatch(fetchCheckoutData(false))
        return () => {
            subscribe;
        }
    }, [])



    const verifyPassedDates = (basket: any) => {
        const basketList = basket;
        let indexToCheckIfNoExpired = true
        basketList.map((item: any) => {
            let firstSlotExpired = false
            let secondSlotExpired = false
            item.deliverySlots.map((deliveries: any, index: number) => {
                const currentTime = moment(new Date())
                const cutOffInMoment = moment(deliveries.cutoff)
                const seconds = Math.round(moment.duration(cutOffInMoment.diff(currentTime)).asSeconds())

                if (index === 0 && (seconds < 1 || deliveries.limitedAvailability === 0)) {
                    firstSlotExpired = true
                } else if (index === 1 && (seconds < 1 || deliveries.limitedAvailability === 0)) {
                    secondSlotExpired = true
                }
                if (firstSlotExpired && secondSlotExpired) {
                    const tempExpiredDates = expiredDates
                    tempExpiredDates.push(item)
                    setExpiredDates(tempExpiredDates)
                    setShowExpiredDates(true)
                    allCasePass.current = false
                }
            })
            if (expiredDates.length > 0) {
                indexToCheckIfNoExpired = false
            }
        })

        if (indexToCheckIfNoExpired) {
            checkIfAnyItemIsSoldOut(basket)
        }
    }
    const checkIfAnyItemIsSoldOut = (basket: any) => {
        const basketList = JSON.parse(JSON.stringify(basket))
        let tempIfSoldOut = false
        const soldOutBasket: any = []
        basketList.map((item: any) => {
            item.items.map((items: any, index: number) => {
                if (items.product?.limitedAvailability === 0) {
                    const obj = {
                        date: item.date,
                        deliverySlot: item.deliverySlot,
                        productId: items.product.id,
                        variant: items.product.variants.defaultVariant,
                        count: 0,
                    }
                    soldOutBasket.push(obj)
                    setShowSoldOutMeals(true)
                    allCasePass.current = false
                    tempIfSoldOut = true
                }
            })

        })
        if (!tempIfSoldOut) { checkifAnyItemHaveLimitedAvailability(basket) }
        else {
            setSoldOutMeals(soldOutBasket)
        }

    }
    const checkifAnyItemHaveLimitedAvailability = (basket: any) => {
        const basketList = JSON.parse(JSON.stringify(basket))
        const limitedBasket: any = []
        let tempIfLimited = false
        basketList.map((item: any) => {
            item.items.map((items: any) => {
                if (items.product?.limitedAvailability < items.count && items.product?.limitedAvailability !== 0) {
                    const obj = {
                        date: item.date,
                        deliverySlot: item.deliverySlot,
                        productId: items.product.id,
                        variant: items.product.variants.defaultVariant,
                        count: items.product?.limitedAvailability,
                    }
                    limitedBasket.push(obj)
                    allCasePass.current = false
                    tempIfLimited = true
                }
            })
        })

        if (!tempIfLimited && limitedBasket.length < 1) {
            verifyIfAnySlotIsPassed(basket)
        } else {
            setLimitedMeals(limitedBasket)
            setShowLimitedAvailability(true)
        }
    }
    const verifyIfAnySlotIsPassed = (basket: any) => {
        const basketList = JSON.parse(JSON.stringify(basket))
        for (let i = 0; i < basketList.length; i++) {
            const item = basketList[i];
            const slotIndex = item.deliverySlots.findIndex((deliveries: any) => (deliveries.name === item.deliverySlot))
            item.deliverySlots.map((delivery: any, index: number) => {
                if (slotIndex === index) {
                    delivery.isSelected = true
                } else {
                    delivery.isSelected = false
                }
            })

            const selectedDeliveries = item.deliverySlots[slotIndex]
            const currentTime = moment(new Date())
            const cutOffInMoment = moment(selectedDeliveries.cutoff)
            const seconds = Math.round(moment.duration(cutOffInMoment.diff(currentTime)).asSeconds())
            if (seconds < 1 || selectedDeliveries?.limitedAvailability === 0) {
                setSlotPassedData(item)
                setShowPassedSlot(true)
                allCasePass.current = false
                break;
            }
        }
        if (allCasePass.current) {
            onPressCheckout()
        }
    }
    const handleUpdateChangePassedSlots = () => {
        setIsLoading(true)
        const PassedSlotsProduct: any = []
        const slotIndex = slotPassedData?.deliverySlots.findIndex((deliveries: any) => (deliveries.isSelected))
        const selectedSlot = slotPassedData?.deliverySlots[slotIndex]
        slotPassedData.items.map((items: any) => {
            const currentTime = utils.commonFunctions.worldClock(1, "Europe", null)
            const cutOffInMoment = moment(selectedSlot.cutoff)
            const currentTimeAmsMoment = moment(currentTime);
            const { seconds } = utils.commonFunctions.diffYMDHMS(cutOffInMoment, currentTimeAmsMoment)

            if (seconds > 0 && selectedSlot?.limitedAvailability !== 0 && selectedSlot.isSelected) {
                const objToModify = {
                    date: slotPassedData.date,
                    deliverySlot: selectedSlot.name,
                    productId: items.product.id,
                    variant: items.product.variants.defaultVariant,
                    count: items.count,
                }
                PassedSlotsProduct.push(objToModify)
            }
        })
        dispatch(updateBasketQuantity(PassedSlotsProduct, true, (basket: any) => {
            setShowPassedSlot(false)
            setIsLoading(false)
            verifyIfAnySlotIsPassed(basket)
        }))

    }

    const sub = (base: any, exponent: any, baseSecond?: any, dynamicStyle?: any, dynamicSubStyle?: any) => {

        return <View style={[styles.mainWrapperSubscript, { justifyContent: 'flex-end' }]}>
            <View style={styles.baseViewWrapper}>
                <Text style={[utils.commonStyles.baseStyle, dynamicStyle]}>{base + ","}</Text>
            </View>
            <View style={styles.exponentViewWrapper}>
                <Text style={[utils.commonStyles.exponentStyle, dynamicSubStyle]}>{exponent}</Text>
            </View>
            <View style={styles.baseViewWrapper}>
                <Text style={[utils.commonStyles.baseStyle, dynamicStyle]}>{baseSecond}</Text>
            </View>

        </View>
    }

    const toCheckSelectedSlot = (selectedItem: selectedItemProps) => {
        const selectedSlot = selectedItem.item.deliverySlot;
        let currentSelectedSlot: string = ''
        selectedItem.item.deliverySlots.forEach((element: any) => {
            if (element.name === selectedSlot) {
                currentSelectedSlot = element.name
            }
        });
        return currentSelectedSlot;

    }

    const toHandleIncQuantity = (currentItem: any, currentDayDelivery: any) => {
        const selectedIndex = currentDayDelivery.item.deliverySlots.findIndex((item: any, index: number) => {
            return item.name === currentDayDelivery.item.deliverySlot
        })
        const cutOffTime = moment(currentDayDelivery.item.deliverySlots[selectedIndex].cutoff)
        const currentTime = moment(new Date());

        const timeDifference = Math.round(moment.duration(cutOffTime.diff(currentTime)).asSeconds())
        if (timeDifference > 0) {
            dispatch({
                type: types.HANLDE_LOADER_ADD_REMOVE_BASKET,
                isLoading: true
            })
            let quantitySelected = 0;
            currentDayDelivery?.item?.items.forEach((item: any) => {
                if (currentItem.product.id === item.product.id) {
                    item.count = item.count + 1;
                    quantitySelected = item.count;
                }
            })

            const data = {
                date: currentDayDelivery?.item.date,
                deliverySlot: toCheckSelectedSlot(currentDayDelivery),
                productId: currentItem.product.id,
                variant: currentItem.product.variants.variants[0].code,
                count: quantitySelected,
                basketScreen: true
            }
            dispatch(increaseDecreaseBasketQuantity(data))
        }
    }

    const toHandleDcrQuantity = (currentItem: any, currentDayDelivery: any) => {
        const selectedIndex = currentDayDelivery.item.deliverySlots.findIndex((item: any, index: number) => {
            return item.name === currentDayDelivery.item.deliverySlot
        })

        const cutOffTime = moment(currentDayDelivery.item.deliverySlots[selectedIndex].cutoff)
        const currentTime = moment(new Date());

        const timeDifference = Math.round(moment.duration(cutOffTime.diff(currentTime)).asSeconds())

        if (timeDifference > 0) {
            dispatch({
                type: types.HANLDE_LOADER_ADD_REMOVE_BASKET,
                isLoading: true
            })
            let quantitySelected = 0;
            currentDayDelivery?.item?.items.forEach((item: any) => {
                if (currentItem.product.id === item.product.id) {
                    if (item.count > 0) {
                        item.count = item.count - 1;
                        quantitySelected = item.count;
                    }
                }
            })

            const data = {
                date: currentDayDelivery?.item.date,
                deliverySlot: toCheckSelectedSlot(currentDayDelivery),
                productId: currentItem.product.id,
                variant: currentItem.product.variants.variants[0].code,
                count: quantitySelected,
                basketScreen: true
            }
            dispatch(increaseDecreaseBasketQuantity(data))
        }
    }

    const renderDayWiseFood = ({ item, index }: DayWiseFood, currentDayDelivery: DayDelivery) => {
        const splitPrice = item.totalPrice.toLocaleString("nl-US", { minimumFractionDigits: 2 }).toString()
        const splitPriceBD = splitPrice.split(',')[0];
        const splitPriceAD = splitPrice.split(',')[1];
        return (
            <View style={[styles.dayWiseMainContainer, { paddingTop: index === 0 ? vh(24) : vh(8), paddingBottom: index === currentDayDelivery.item?.items.length - 1 ? vh(24) : vh(8) }]}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.menuImageContainer}>
                        <CustomFastImage
                            width={vw(100)}
                            height={vw(100)}
                            style={{
                                width: vw(100),
                                height: vw(100)
                            }}
                            source={{
                                uri: utils.commonFunctions.isNullUndefined(item.product?.listingPicture) ? '' : selectImageVariant(PixelRatio.getPixelSizeForLayoutSize(vw(140)), item?.product?.listingPicture),
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={{ justifyContent: "space-between", paddingVertical: vh(10) }}>
                        <Text style={styles.nameItem} numberOfLines={2}>{item.product.name}</Text>
                        <View style={styles.wrappperPlusMinus}>
                            {
                                item.product?.limitedAvailability === 0
                                    ?
                                    <View style={styles.soldOutContainer}>
                                        <Text numberOfLines={1} style={styles.soldOuTText}>{`${t('soldOut')}`}</Text>
                                    </View>
                                    :
                                    (
                                        managingQuntityIndex === index && managingQuntityDayIndex === currentDayDelivery.item.date && props.basketReducer.isLoading && loaderForQuantity === true ?
                                            <View style={{
                                                width: vw(72), alignItems: "center",
                                                justifyContent: "center",
                                            }}>
                                                <ActivityIndicator color={colors.splashPrimary} size="small" />
                                            </View>
                                            :
                                            <View style={styles.innerWrapperPlusMinus}>
                                                <ClickableImage _imagePath={getImageFromURL(IMAGES.MINUS_ICON)} buttonStyle={styles.imagePlus}
                                                    _onPress={() => {
                                                        setEditingBasketDate("")
                                                        setManagingQuntityIndex(index)
                                                        setManagingQuntityDayIndex(currentDayDelivery.item.date)
                                                        toHandleDcrQuantity(item, currentDayDelivery)
                                                        setLoaderForQuantity(true)
                                                    }}
                                                />
                                                <Text style={styles.textQuantity}>{item.count}</Text>
                                                <ClickableImage _imagePath={getImageFromURL(IMAGES.PLUS_ICON)} buttonStyle={styles.imageMinus}
                                                    _onPress={() => {
                                                        setEditingBasketDate("")
                                                        setManagingQuntityIndex(index)
                                                        setManagingQuntityDayIndex(currentDayDelivery.item.date)
                                                        toHandleIncQuantity(item, currentDayDelivery)
                                                        setLoaderForQuantity(true)
                                                    }}
                                                />
                                            </View>
                                    )
                            }
                            <Text>
                                {(() => sub(`€${splitPriceBD}`, `${splitPriceAD}`, ""))()}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>)
    }

    const toCheckActiveSlot = (selectedItemForCheckActiveSlot: DayDelivery) => {
        const selectedSlot = selectedItemForCheckActiveSlot.item.deliverySlot;
        let selectedSlotTimings: string = '';
        selectedItemForCheckActiveSlot.item.deliverySlots.forEach((element: any) => {
            if (element.name === selectedSlot) {
                selectedSlotTimings = element.start.split('+')[0] + " -" + element.end.split('+')[0]
                return selectedSlotTimings;
            }
        });
        return selectedSlotTimings;
    }

    const toMakeSlotsSelected = (slotsArray: SubslotsArray, clickedDeliveryDay: DayDelivery) => {

        //here we are making the slots selected according to the user choice we are getting in the api.
        const selectedSlot = clickedDeliveryDay.deliverySlot;
        slotsArray.map((element: any) => {
            if (element.name === selectedSlot) {
                element.isSelected = true
            }
            else {
                element.isSelected = false
            }
        });
        setTimeSlot(slotsArray)
    }

    const handleEditIconTap = (clickedDeliveryDay: any) => {
        const slotsArray = JSON.parse(JSON.stringify(clickedDeliveryDay.deliverySlots))
        toMakeSlotsSelected(slotsArray, clickedDeliveryDay)
        setCurrentEditTapDelivery(clickedDeliveryDay)
        setShowEditSlots(true)
    }

    const renderBsktList = (currentItem: any) => {
        return (
            <View style={styles.mainContainerBsktList}>
                <Text style={styles.textDate}>{getDateDayMonth(
                    1,
                    new Date(currentItem.item.date).getDay(),
                    new Date(currentItem.item.date).getMonth(),
                    new Date(currentItem.item.date).getDate()
                )}</Text>
                {
                    editingBasketDate === currentItem.item.date && props.basketReducer.isLoading && loaderForQuantity === false ?
                        <View style={{
                            width: vw(72),
                            alignItems: "center",
                            justifyContent: "center",
                            height: vw(17),
                            marginBottom: vh(8)
                        }}>
                            <ActivityIndicator color={colors.splashPrimary} size="small" />
                        </View>
                        :
                        <View style={styles.mainWrapperEditDate}>
                            <Text style={styles.textDeliveryTime}>{`${t('Delivery_time')}`}: <Text style={styles.textTime}>{toCheckActiveSlot(currentItem)}</Text></Text>
                            <ClickableImage _imagePath={getImageFromURL(IMAGES.EDIT_ICON)} buttonStyle={styles.imageWrapper} imageStyle={styles.imageEdit}
                                _onPress={() => {
                                    setEditingBasketDate(currentItem.item.date)
                                    handleEditIconTap(currentItem.item)
                                    setLoaderForQuantity(false)
                                }}
                                _resizeMode="contain" _hitSlop={appConstants.HIT_SLOPE} />
                        </View>
                }

                <FlatList
                    data={currentItem.item?.items}
                    renderItem={(item: any) => renderDayWiseFood(item, currentItem)}
                    listKey={commonFunction.keyFinder()}
                />
            </View>
        )
    }

    const emptyView = () => {
        return (
            <View style={styles.emptyBasketMainView}>
                <Image source={getImageFromURL(IMAGES.EMPTY_BASKET)}
                    style={styles.imageBasketView}
                    resizeMode="contain"
                />
                <Text style={styles.textEmptyBasket}>{`${t('emptyBasketMessage')}`}</Text>
            </View>
        )
    }

    const renderSeperatorView = () => {
        return <View style={styles.seperatorView} />
    }

    const renderCellDayPrice = (currentItem: any) => {

        const splitPrice = currentItem.item.priceItemsSum.toLocaleString("nl-US", { minimumFractionDigits: 2 })
        const splitPriceBD = splitPrice.split(',')[0]; //Price before decimal
        const splitPriceAD = splitPrice.split(',')[1]; // Price after decimal
        return (
            <View style={styles.cellDayPriceWrapper}>
                <Text style={styles.textDay}>{getDateDayMonth(
                    1,
                    new Date(currentItem.item.date).getDay(),
                    new Date(currentItem.item.date).getMonth(),
                    new Date(currentItem.item.date).getDate()
                )}</Text>
                <Text style={styles.textPrice}>{(() => sub(`€${splitPriceBD}`, `${splitPriceAD}`, ""))()}</Text>
            </View>
        )
    }

    const renderDaywisePriceSummary = () => {
        //deliveries
        return (
            <View style={styles.main2}>
                <FlatList
                    data={props.basketReducer.basketList}
                    renderItem={renderCellDayPrice}
                    listKey={commonFunction.keyFinder()}
                />
            </View>
        )
    }

    const renderBillBreakUp = ({ item, index }: subBillBreakUp) => {
        const priceBreakUp = item.value?.toLocaleString("nl-US", { minimumFractionDigits: 2 })
        // const deliveryCharge = parseInt(props.basketReducer.basketBillBreakdown[1].deliverySum) / props.basketReducer.basketList.length;
        const deliveryCharge = props.basketReducer.basketDeliverySum / props.basketReducer.basketList.length;
        const deliveryChargeBreakUp = deliveryCharge.toLocaleString("nl-US", { minimumFractionDigits: 2 })
        // Will be rquired in future : - (() => sub(`€${item.deliverySum.split(',')[0]},`, `${item.deliverySum.split(',')[1]}`,""))()
        let textColor;
        switch (item.title) {
            case t('total'):
                textColor = colors.color_1B194B
                break;
            case t('subTotal'):
                textColor = colors.color_rgba_0_0_0_7
                break;
            case t('Promotion'):
                textColor = colors.color_33D15F
                break;
            default:
                textColor = colors.color_rgba_0_0_0_7;
        }

        return (
            <View style={styles.billBreakerWrapper}>
                <Text
                    style={{
                        fontFamily: fonts.poppinsSemiBold,
                        fontSize: index === ((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 2 : 3) ? vw(14) : vw(12),
                        lineHeight: vw(17),
                        color: index === ((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 2 : 3) ? colors.color_1B194B : colors.color_rgba_0_0_0_7
                    }}>
                    {
                        index === ((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 1 : 2) ?
                            (() => sub(`${item.title} €${deliveryChargeBreakUp.split(',')[0]}`, `${deliveryChargeBreakUp.split(',')[1]}`, ` ${item.deliveryDays}`,
                                {
                                    fontFamily: fonts.poppinsSemiBold,
                                    fontSize: vw(12),
                                    color: colors.color_rgba_0_0_0_7,
                                    lineHeight: vw(16),
                                },
                                { fontSize: vw(8) }
                            ))()
                            :
                            item.title
                    }
                </Text>
                <Text style={{
                    fontFamily: index === ((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 2 : 3) ? fonts.poppinsBold : fonts.poppinsSemiBold,
                    fontSize: index === ((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 2 : 3) ? vw(22) : vw(16),
                    lineHeight: vw(21)
                }}>

                    {(() => sub(`${(props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? '' : (index === 1 ? '- ' : "")
                        }€${priceBreakUp?.split(',')[0]}`, `${priceBreakUp?.split(',')[1]}`, "",
                        {
                            fontFamily: index === ((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 2 : 3) ? fonts.poppinsBold : fonts.poppinsSemiBold,
                            fontSize: index === ((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 2 : 3) ? vw(22) : vw(16),
                            lineHeight: index === ((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 2 : 3) ? vw(28) : vw(21),
                            color: textColor,

                        },
                        {
                            fontFamily: index === ((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 2 : 3) ? fonts.poppinsBold : fonts.poppinsSemiBold,
                            color: textColor
                        }
                    ))()}
                </Text>
            </View>
        )
    }

    const renderTotalndDelivery = () => {
        return (
            <View style={styles.textTotalNd}>
                <FlatList
                    data={props.basketReducer.basketBillBreakdown}
                    renderItem={renderBillBreakUp}
                    listKey={commonFunction.keyFinder()}
                />
            </View>
        )
    }

    const onPressCheckout = () => {
        if (props.checkoutReducer.name === null || props.checkoutReducer.phone === null) {
            props.navigation.navigate(screens.contactDetails.contactDetails.name)
        } else {
            props.navigation.navigate(screens.checkout.checkout.name)
        }
    }

    const renderCheckoutButton = () => {
        return (
            <PrimaryButton
                title={t('checkout')}
                onPress={() => {
                    allCasePass.current = true
                    // props.basketReducer?.promoName?.length === 0 ?
                    dispatch(fetchBasketList(true, (basket: any) => { verifyPassedDates(basket) }))
                }}
                touchablestyle={styles.buttonStyle}
                textstyle={styles.buttonTextStyle}
                activeopacity={activeOpacity}
            />)
    }


    const renderPromoCode = () => {
        return (
            <TouchableOpacity style={styles.promocodeContainer}
                onPress={
                    () => (props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? props.navigation.navigate(screens.promoCode.promoCode.name) :
                        ""}
                activeOpacity={
                    (props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? .8 : 1
                }
            >
                <View style={styles.imagePromoCodeContainer}>
                    <Image source={getImageFromURL(IMAGES.PROMO_CODE)} />
                    {(props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ?
                        <Text style={styles.addPromoCodeText}>{`${t("Addpromocode")}`}</Text>
                        :
                        <View>
                            <Text style={[styles.addPromoCodeText, {
                                marginBottom: vh(-3)
                            }]}>{`${t("Promotionapplied")}`}</Text>
                            <Text style={[styles.addPromoCodeText,
                            { fontFamily: fonts.poppinsRegular }]}>
                                {`${t('YouSave')} ${props.basketReducer.priceDiscountSum} ${t('euro')}`}</Text>
                        </View>
                    }
                </View>
                <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    onPress={
                        () => (props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? props.navigation.navigate(screens.promoCode.promoCode.name) :
                            dispatch(deletePromoCode())}
                    activeOpacity={
                        (props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? 1 : .8
                    }>
                    <Image source={getImageFromURL((props.basketReducer?.promoName?.length === 0 || props.basketReducer?.promoName === undefined) ? IMAGES.EDIT_ICON : IMAGES.DELETE)} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    const renderPricingSummary = () => {
        return (
            <View style={{ paddingBottom: vh(10) }}>
                {renderSeperatorView()}
                {renderPromoCode()}
                {renderSeperatorView()}
                {renderDaywisePriceSummary()}
                {renderSeperatorView()}
                {renderTotalndDelivery()}
            </View>
        )
    }

    const renderTimeSlotView = ({ item, index }: TimeSlotView) => {
        const startTime = item.start.split('+')[0]
        const endTime = item.end.split('+')[0]
        const tempCutOffTime = item.cutoff.toString().split('T')[1];
        const cutOffHour = tempCutOffTime.toString().split(':')[0];
        const cutOffMin = tempCutOffTime.toString().split(':')[1];
        const currentTime = utils.commonFunctions.worldClock(1, "Europe", null)
        const cutOffInMoment = moment(item.cutoff)
        const currentTimeAmsMoment = moment(currentTime);
        const { seconds } = utils.commonFunctions.diffYMDHMS(cutOffInMoment, currentTimeAmsMoment)
        return (
            <TimeSlotMenu
                slotTime={item?.limitedAvailability !== 0 ?
                    `${startTime} - ${endTime} (${t("orderBefore")} ${cutOffHour}:${cutOffMin})`
                    : `${startTime} - ${endTime} (${t('soldout')})`
                }
                isSelected={item.isSelected}
                onPress={() => {
                    handleSelectTimeSlot(index)
                }}
                isValidNow={(seconds >= 0 ? (item?.limitedAvailability === 0 ? false : true) : false)}
            />
        )
    }
    const handleSelectTimeSlot = (selectedIndex: number) => {
        const tempTimeSlot = JSON.parse(JSON.stringify(timeSlot))
        tempTimeSlot.forEach((item: any, index: number) => {
            if (selectedIndex === index) {
                tempTimeSlot[index].isSelected = true
            } else {
                tempTimeSlot[index].isSelected = false
            }
        })
        setTimeSlot(tempTimeSlot)
    }

    const handleApplyUpdatedSlotBtn = () => {
        currentEditTapDelivery.deliverySlots = timeSlot
        setCurrentEditTapDelivery(currentEditTapDelivery)
        setShowEditSlots(false)
        const data = {
            date: currentEditTapDelivery?.date,
            deliverySlot: toCheckUpdatedSlotTime(currentEditTapDelivery.deliverySlots),
            basketScreen: true
        }
        dispatch({
            type: types.HANLDE_LOADER_ADD_REMOVE_BASKET,
            isLoading: true
        })
        dispatch(increaseDecreaseBasketQuantity(data))
        setShowEditSlots(!showEditSlots);
    }

    const toCheckUpdatedSlotTime = (currentEditTapDlvrySlt: []) => {

        let selectedSlot: string = ""
        currentEditTapDlvrySlt.forEach((element: any) => {
            if (element.isSelected) {
                selectedSlot = element.name
            }
        });
        return selectedSlot;
    }
    const renderSlotModal = () => {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={showEditSlots}
                onRequestClose={() => {
                    setShowEditSlots(!showEditSlots);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    // onPress={() => {
                    //     setShowEditSlots(!showEditSlots);
                    // }}
                    style={styles.modalContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.modalSecondryContainer}>
                        <View style={styles.modalDataContainer}>
                            <Text style={styles.selectedTimeForDeliveryText}>{`${t('timeSlotMessage')}`}</Text>
                        </View>
                        <View style={styles.dayDateContainer}>
                            <Text style={styles.dayDateText}>{getDateDayMonth(
                                1,
                                new Date(currentEditTapDelivery.date).getDay(),
                                new Date(currentEditTapDelivery.date).getMonth(),
                                new Date(currentEditTapDelivery.date).getDate()
                            )}</Text>
                        </View>
                        <View style={styles.slotContainer}>
                            {timeSlot.length > 0 && <FlatList
                                data={timeSlot}
                                renderItem={renderTimeSlotView}
                            />}
                        </View>
                        <View style={styles.slotContainer}>
                            <PrimaryButton
                                title={t('apply')}
                                onPress={() => handleApplyUpdatedSlotBtn()}
                                touchablestyle={styles.buttonModalStyle}
                                textstyle={styles.buttonModalTextStyle}
                            />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }
    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <PrimaryHeader
                    iconSize={vw(22)}
                    iconColor={colors.blackColor}
                    left={"left"}
                    title={t('basketReview')}
                    mainContainer={styles.headerMainContainer}
                    titleStyle={styles.headerTitleStyle}
                    leftPress={() => {
                        onPressLeftIcon()
                    }}
                />
                {
                    <View style={styles.basketViewMain}>
                        <FlatList
                            data={props.basketReducer.basketList}
                            renderItem={renderBsktList}
                            ListFooterComponent={props.basketReducer.basketList.length > 0 ? renderPricingSummary() : null}
                            listKey={commonFunction.keyFinder()}
                            ListEmptyComponent={emptyView}
                            refreshing={false}
                            onRefresh={() => {
                                allCasePass.current = false
                                dispatch(fetchBasketList(true, (basket: any) => { verifyPassedDates(basket) }
                                ))
                            }}
                        />
                    </View>
                }
                {props.basketReducer.basketList.length > 0 && renderCheckoutButton()}
            </SafeAreaView>
            {renderSlotModal()}
            < DeliverySlotChangePopUpModal
                visible={showPassedSlot}
                onPress={(selectedSlotname: string) => {
                    const tempSlotPassedData = slotPassedData;
                    const tempDeliverySlot = tempSlotPassedData?.deliverySlots;

                    const selectedIndex = tempDeliverySlot.findIndex((item: any) => item.name === selectedSlotname)
                    const currentTime = moment(new Date())
                    const cutOffInMoment = moment(tempDeliverySlot[selectedIndex].cutoff)
                    const seconds = Math.round(moment.duration(cutOffInMoment.diff(currentTime)).asSeconds())
                    if (seconds > 0 && tempDeliverySlot[selectedIndex]?.limitedAvailability !== 0) {
                        tempDeliverySlot.map((deliveries: any, index: number) => {
                            if (selectedIndex === index) {
                                deliveries.isSelected = true
                            } else {
                                deliveries.isSelected = false
                            }
                        })
                    }

                    tempSlotPassedData.deliverySlots = tempDeliverySlot
                    setSlotPassedData(JSON.parse(JSON.stringify(tempSlotPassedData)))

                }}
                ButtonPress={() => {
                    const slotIndex = slotPassedData?.deliverySlots.findIndex((deliveries: any) => (deliveries.isSelected))
                    const selectedSlot = slotPassedData?.deliverySlots[slotIndex]
                    const currentTime = utils.commonFunctions.worldClock(1, "Europe", null)
                    const cutOffInMoment = moment(selectedSlot.cutoff)
                    const currentTimeAmsMoment = moment(currentTime);
                    const { seconds } = utils.commonFunctions.diffYMDHMS(cutOffInMoment, currentTimeAmsMoment)

                    if (seconds > 0 && selectedSlot?.limitedAvailability !== 0 && selectedSlot.isSelected) {
                        handleUpdateChangePassedSlots()
                    }
                }}
                headerText={t('DeliveryUpdates')}
                messageText1={t('TheDeliveryTimeYouSelected')}
                messageText2={t('isNoLongerAvailablechooseAnotherone')}
                messageText3={''}
                dayDateAndMonth={`${moment(slotPassedData?.date).format("dddd")}, ${moment(slotPassedData?.date).format("MMMM DD")}`}
                buttonTitle={t('ChangeTheTimeslot')}
                slotData={slotPassedData?.deliverySlots}
                isLoading={isLoading}
                ButtonPressCross={() => { setShowPassedSlot(false) }}
            />
            < DeliveryUpdatePopUpModal
                visible={showExpiredDates}
                ButtonPress={() => {
                    setIsLoading(true)
                    const expiredBasket: any = []
                    expiredDates.map((item: any) => {
                        item.items.map((deliveries: any) => {
                            const objExpired = {
                                date: item.date,
                                deliverySlot: item.deliverySlot,
                                productId: deliveries.product.id,
                                variant: deliveries.product.variants.defaultVariant,
                                count: 0,
                            }
                            expiredBasket.push(objExpired)
                        })
                    })
                    dispatch(updateBasketQuantity(expiredBasket, true, (basket: any) => {
                        setShowExpiredDates(false)
                        setExpiredDates([])
                        setIsLoading(false)
                        checkIfAnyItemIsSoldOut(basket)
                    }))

                }}
                headerText={t('DeliveryUpdates')}
                messageText1={t('SorryButorderingisnoLongerPossibleFor')}
                buttonTitle={t('UpdateTheBasket')}
                listData={expiredDates}
                isLoading={isLoading}
                ButtonPressCross={() => { setShowExpiredDates(false); setExpiredDates([]) }}
            />
            <BottomPopUp
                visible={showLimitedAvailability}
                buttonTitle={t('UpdateTheBasket')}
                ButtonPress={() => {
                    setIsLoading(true)
                    dispatch(updateBasketQuantity(limitedMeals, true, (basket: any) => {
                        setShowLimitedAvailability(false)
                        verifyIfAnySlotIsPassed(basket)
                        setIsLoading(false)
                    }))
                }}
                headerText={t("LimitedAvailability")}
                messageText1={t('Wedonothaveenoughofsome')}
                messageText3={t('mealsyouselected')}
                isLoading={isLoading}
                ButtonPressCross={() => { setShowLimitedAvailability(false) }}
            />
            <BottomPopUp
                visible={showSoldOutMeals}
                buttonTitle={t('UpdateTheBasket')}
                ButtonPress={() => {
                    setIsLoading(true)
                    dispatch(updateBasketQuantity(soldOutMeals, true, (basket: any) => {
                        setShowSoldOutMeals(false)
                        setIsLoading(false)
                        checkifAnyItemHaveLimitedAvailability(basket)
                    }))
                }}
                headerText={t('SoldOutMeals')}
                messageText1={t('WeveRunOutofsomemealsgocheckthe')}
                messageText2={t('gochecktheotherdeliciousoptions')}
                messageText3={''}
                isLoading={isLoading}
                ButtonPressCross={() => { setShowSoldOutMeals(false) }}
            />
        </>
    )
}
function mapStateToProps(state: any) {
    const { basketReducer, checkoutReducer } = state
    return {
        basketReducer,
        checkoutReducer
    }
}

export default connect(
    mapStateToProps,
    null
)(BasketBaseScreen)
