import React, { useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Platform
} from 'react-native';
import { vw, vh, colors, screens, fonts } from '@app/constants';
import { styles } from '@app/screens/checkout/checkout/styles';
import {
    TimeSlotMenu,
    CheckoutAddressDeliveryCard,
    PrimaryButton,
    PrimaryHeader,
    DeliverySlotCheckout
} from '@app/components';
import { CommonActions } from '@react-navigation/native';
import { t } from 'i18next';
import { useDispatch, connect } from "react-redux";
import { increaseDecreaseBasketQuantity, updateBasketQuantity, fetchBasketList } from '@screen/basket//basketAction/basketAction';
import { fetchCheckoutData } from '@screen/contact/contactAction/checkoutAction';
import utils from '@app/utils';
import moment from 'moment-timezone';
import { getImageFromURL, IMAGES } from '@app/constants/images';
import types from '@screen/basket/basketAction/types';
import { CheckoutProps, Item, TimeSlotView } from '@app/utils/interface';
import { placeOrder, updatePaymentStatus } from '@app/screens/checkout/order/orderAction';
import BottomPopUp from '@app/components/bottom-popup';
import { getDateDayMonth } from '@app/utils/common-function';
import { DeliverySlotChangePopUpModal, DeliveryUpdatePopUpModal } from "@app/components/delivery-bottom-popup-modal";
import checkoutTypes from "@app/screens/checkout/order/orderAction/types";

const Checkout = (props: CheckoutProps) => {
    const allCasePass = React.useRef(false)
    const [showEditSlots, setShowEditSlots] = useState<boolean>(false)
    const [timeSlot, setTimeSlot] = useState<any>([])
    const [currentEditTapDelivery, setCurrentEditTapDelivery] = useState<any>({})
    const [editingBasketDate, setEditingBasketDate] = useState<string>("")
    const [isErrorMessageForAddress, setIsErrorMessageForAddress] = useState<boolean>(false)
    const [isErrorMessageForPayment, setIsErrorMessageForPayment] = useState<boolean>(false)
    const [expiredDates, setExpiredDates] = useState<any>([])
    const [showExpiredDates, setShowExpiredDates] = useState<boolean>(false);
    const [showSoldOutMeals, setShowSoldOutMeals] = useState<boolean>(false);
    const [soldOutMeals, setSoldOutMeals] = useState<any>([])
    const [showLimitedAvailability, setShowLimitedAvailability] = useState<boolean>(false);
    const [limitedMeals, setLimitedMeals] = useState<any>([])
    const [showPassedSlot, setShowPassedSlot] = useState<boolean>(false)
    const [slotPassedData, setSlotPassedData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(fetchCheckoutData(false));
        const unsubscribe = props.navigation.addListener('focus', () => {
            setIsErrorMessageForAddress(false);
            setIsErrorMessageForPayment(false)
            dispatch({
                type: checkoutTypes.HANDLE_LOADER,
                isLoading: false
            });
        });
        return () => {
            unsubscribe;
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
                    // setShowExpiredDates(true)
                    allCasePass.current = false
                    props.navigation.goBack()
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
            item.items.map((items: any) => {
                if (items.product?.limitedAvailability === 0) {
                    const obj = {
                        date: item.date,
                        deliverySlot: item.deliverySlot,
                        productId: items.product.id,
                        variant: items.product.variants.defaultVariant,
                        count: 0,
                    }
                    soldOutBasket.push(obj)
                    //setShowSoldOutMeals(true)
                    props.navigation.goBack()
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
            props.navigation.goBack()
            //setShowLimitedAvailability(true)
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
                props.navigation.goBack()
                //setShowPassedSlot(true)
                allCasePass.current = false
                break;
            }
        }
        dispatch({
            type: checkoutTypes.HANDLE_LOADER,
            isLoading: false
        });
        if (allCasePass.current) {
            handlePay()
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
            if (seconds > 0 && items?.limitedAvailability !== 0 && selectedSlot.isSelected) {
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

    const toMakeSlotsSelected = (slotsArray: [], clickedDeliveryDay: Item) => {
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

    const handleEditIconTapForSlots = (clickedDeliveryDay: Item) => {
        const slotsArray = JSON.parse(JSON.stringify(clickedDeliveryDay.deliverySlots))
        toMakeSlotsSelected(slotsArray, clickedDeliveryDay)
        setCurrentEditTapDelivery(clickedDeliveryDay)
        setShowEditSlots(true)
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
        // toAddRemovePrdts(data)
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

    const toCheckActiveSlot = (selectedItem: Item) => {
        const selectedSlot = selectedItem.deliverySlot;
        let selectedSlotTimings: string = '';
        selectedItem.deliverySlots.forEach((element: any) => {
            if (element.name === selectedSlot) {
                selectedSlotTimings = `${element.start.split('+')[0]} - ${element.end.split('+')[0]}`
                return selectedSlotTimings;
            }
        });
        return selectedSlotTimings;
    }
    const renderDeliverySlots = ({ item, index }: { item: Item, index: number }) => {
        return (
            <TouchableOpacity activeOpacity={0.8}
                onPress={() => {
                    setEditingBasketDate(item.date)
                    handleEditIconTapForSlots(item)
                }}>
                <View style={styles.renderDeliverySlotsContainer}>
                    <Text style={styles.dayAndDateText}>{getDateDayMonth(
                        2,
                        new Date(item.date).getDay(),
                        new Date(item.date).getMonth(),
                        new Date(item.date).getDate()
                    )}</Text>
                    {
                        editingBasketDate === item.date && props.basketReducer.isLoading ?
                            <View style={styles.deliverySlotLoader}>
                                <ActivityIndicator color={colors.splashPrimary} size="small" />
                            </View>
                            :
                            <View style={styles.slotAndEditContainer}>
                                <Text style={styles.slotText}>{toCheckActiveSlot(item)}</Text>
                                <Image
                                    source={getImageFromURL(IMAGES.EDIT_ICON)}
                                />
                            </View>
                    }
                </View >
            </TouchableOpacity>
        )
    }
    const onPressLeftIcon = () => {
        props.navigation.dispatch({
            ...CommonActions.goBack(),
            comeFromPromoCode: false,
        });
    }

    const verifyBasket = () => {
        allCasePass.current = true
        dispatch({
            type: checkoutTypes.HANDLE_LOADER,
            isLoading: true
        });
        dispatch(fetchBasketList(false, (basket: any) => {
            verifyPassedDates(basket)
        })
        )
    }

    const handlePay = () => {
        if (props.checkoutReducer.address != null && props.checkoutReducer.selectedBank != null) {
            setIsErrorMessageForAddress(false);
            setIsErrorMessageForPayment(false);
            dispatch(placeOrder());
        } else if (props.checkoutReducer.address === null) {
            setIsErrorMessageForAddress(true)
            setIsErrorMessageForPayment(false);
        } else if (props.checkoutReducer.selectedBank === null) {
            setIsErrorMessageForPayment(true)
        }
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
                    onPress={() => {
                        setShowEditSlots(!showEditSlots);
                    }}
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
                        {/* <View style={styles.slotContainer}>
                    <Text style={styles.orderBeforeText}>Order before Wednesday 12:00</Text>
                    <Text style={styles.eveningDeliveryText}>Evening delivery? Order before 15:00</Text>
                </View> */}
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
                <View style={styles.dataContainer}>
                    <PrimaryHeader
                        iconSize={vw(22)}
                        iconColor={colors.blackColor}
                        left={"left"}
                        title={t('checkout')}
                        mainContainer={styles.headerMainContainer}
                        titleStyle={styles.headerTitleStyle}
                        leftPress={() => onPressLeftIcon()}
                    />
                    <View style={[styles.deliverySlotContainer]}>
                        <DeliverySlotCheckout
                            title={t('deliverySlots')}
                            renderDeliverySlot={() => (
                                <FlatList
                                    data={props.basketReducer.basketList}
                                    renderItem={renderDeliverySlots}
                                />
                            )}
                        />
                    </View>

                    <View style={styles.dividerDeliverySlot} />

                    <View >
                        <CheckoutAddressDeliveryCard
                            image={getImageFromURL(IMAGES.LOCATION_ICON)}
                            title={t('address')}
                            onPress={() => { props.navigation.navigate(screens.address.addAddress.name); setIsErrorMessageForAddress(false) }}
                            subTitle={props.checkoutReducer.address ? `${props.checkoutReducer.address.street} ${props.checkoutReducer.address.houseNumber}, ${props.checkoutReducer.address.postalCode}` : `${t('enterAddress')}`}
                        />
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <CheckoutAddressDeliveryCard
                            image={getImageFromURL(IMAGES.DELEVERY_ICON)}
                            title={t('deliveryInstruction')}
                            onPress={() => { props.navigation.navigate(screens.deliveryInstruction.deliveryInstruction.name) }}
                            subTitle={props.checkoutReducer.deliveryInstructions ? props.checkoutReducer.deliveryInstructions : `${t('enterDeliveryInstruction')}`}
                            subTitleMarginStart={vw(34)}
                        />
                    </View>
                    <View style={styles.divider} />

                    <View>
                        <CheckoutAddressDeliveryCard
                            image={getImageFromURL(IMAGES.WALLET_ICON)}
                            title={t('payment')}
                            onPress={() => { props.navigation.navigate(screens.payment.payment.name); setIsErrorMessageForPayment(false) }}
                            subTitle={props.checkoutReducer.selectedBank ? props.checkoutReducer.selectedBank?.name : `${t('SelectBank')}`}
                            bankLogoImage={getImageFromURL(IMAGES.IDEAL_LOGO)}
                        />
                    </View>
                </View>
                {
                    <View style={{
                        position: "absolute",
                        bottom: Platform.OS === "ios" ? vh(85) : vh(70),
                        left: vw(20)
                    }}>
                        <Text style={{
                            color: colors.color_F16C6C,
                            fontFamily: fonts.poppinsSemiBold,
                            fontSize: vw(14),
                            lineHeight: vw(18)
                        }}>{isErrorMessageForAddress && `ⓘ ${t('AddressCantBeEmpty')}`}{isErrorMessageForPayment && `ⓘ ${t('BankCantBeEmpty')}`}</Text>
                    </View>
                }
                < PrimaryButton
                    //@ts-ignore
                    title={t('pay') + ` (€${props.basketReducer.basketPriceTotalSum.toLocaleString("nl-US", { minimumFractionDigits: 2 })})`}
                    onPress={() => {
                        //!props.storeOrderNumberReducer.isLoading &&
                        verifyBasket()
                    }}
                    touchablestyle={styles.buttonStyle}
                    textstyle={styles.buttonTextStyle}
                    isLoading={props.storeOrderNumberReducer.isLoading}
                />
            </SafeAreaView>
            {renderSlotModal()}
            {
                props.storeOrderNumberReducer.paymentStatus === "cancel" &&
                <BottomPopUp
                    visible={props.storeOrderNumberReducer.paymentStatus === "cancel"}
                    buttonTitle={`${t('close')}`}
                    ButtonPress={() => dispatch(updatePaymentStatus(""))}
                    headerText={`${t('PaymentCancelled')}`}
                    messageText1={`${t('YouCancelThePayment')}`}
                    messageText2={`${t('CloseAndPressThePayButtonAgain')}`}
                    messageText3={`${t('')}`}
                    ButtonPressCross={() => dispatch(updatePaymentStatus(""))}
                />
            }

            {
                props.storeOrderNumberReducer.paymentStatus === "failed" &&
                <BottomPopUp
                    visible={props.storeOrderNumberReducer.paymentStatus === "failed"}
                    buttonTitle={`${t('close')}`}
                    ButtonPress={() => dispatch(updatePaymentStatus(""))}
                    headerText={`${t('PaymentFailed')}`}
                    messageText1={`${t('PaymentFailedDueToaTechnical')}`}
                    messageText2={`${t('AndPressThePayButtonAgain')}`}
                    messageText3={`${t('')}`}
                    ButtonPressCross={() => dispatch(updatePaymentStatus(""))}
                />
            }
            {
                props.storeOrderNumberReducer.paymentStatus === "rejected" &&
                <BottomPopUp
                    visible={props.storeOrderNumberReducer.paymentStatus === "rejected"}
                    buttonTitle={`${t('close')}`}
                    ButtonPress={() => dispatch(updatePaymentStatus(""))}
                    headerText={`${t('PaymentRejected')}`}
                    messageText1={`${t('PaymentWasRejectedByTheBank')}`}
                    messageText2={`${t('PressThePayButtonAgain')}`}
                    messageText3={`${t('')}`}
                    ButtonPressCross={() => dispatch(updatePaymentStatus(""))} />
            }

            {
                props.storeOrderNumberReducer.paymentStatus === "pending" &&
                <BottomPopUp
                    visible={props.storeOrderNumberReducer.paymentStatus === "pending"}
                    buttonTitle={`${t('close')}`}
                    ButtonPress={() => dispatch(updatePaymentStatus(""))}
                    headerText={`${t('ProcessingPayment')}`}
                    messageText1={`${t('Waitingforthestatusofthepayment')}`}
                    messageText2={`${t('Ifthistakeslongerthanexpectedcheckyour')}`}
                    messageText3={`${t('inboxwewillsendyoutheorderconfirmation')}`}
                    messageText4={`${t('DidnotreceiveitTryorderingagain')}`}
                    activityIndicator={true}
                    ButtonPressCross={() => dispatch(updatePaymentStatus(""))} />
            }

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
                ButtonPress={() => { handleUpdateChangePassedSlots() }}
                headerText={t('DeliveryUpdates')}
                messageText1={t('TheDeliveryTimeYouSelected')}
                messageText2={t('isNoLongerAvailablechooseAnotherone')}
                messageText3={''}
                dayDateAndMonth={`${moment(slotPassedData?.date).format("dddd")}, ${moment(slotPassedData?.date).format("MMMM DD")}`}
                buttonTitle={t('ChangeTheTimeslot')}
                slotData={slotPassedData?.deliverySlots}
                isLoading={isLoading}
                ButtonPressCross={() => {
                    dispatch({
                        type: checkoutTypes.HANDLE_LOADER,
                        isLoading: false
                    }); setShowPassedSlot(false)
                }}
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
                ButtonPressCross={() => {
                    dispatch({
                        type: checkoutTypes.HANDLE_LOADER,
                        isLoading: false
                    }); setShowExpiredDates(false); setExpiredDates([])
                }}
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
                ButtonPressCross={() => {
                    dispatch({
                        type: checkoutTypes.HANDLE_LOADER,
                        isLoading: false
                    }); setShowLimitedAvailability(false)
                }}
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
                ButtonPressCross={() => {
                    dispatch({
                        type: checkoutTypes.HANDLE_LOADER,
                        isLoading: false
                    }); setShowSoldOutMeals(false)
                }}
            />

        </>
    )
}

function mapStateToProps(state: any) {
    const { basketReducer, checkoutReducer, storeOrderNumberReducer
    } = state
    return {
        basketReducer,
        checkoutReducer,
        storeOrderNumberReducer
    }
}

export default connect(
    mapStateToProps,
    null
)(Checkout)