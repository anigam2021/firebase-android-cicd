import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, SafeAreaView, Image, FlatList, PixelRatio, ActivityIndicator, BackHandler } from 'react-native';
import { vh, vw, fonts, colors, screens, } from "@app/constants";
import { styles } from "./styles";
import {
    PrimaryHeader,
    CustomFastImage
} from '@app/components';
import { t } from "i18next";
import FastImage from 'react-native-fast-image';
import { useDispatch, connect } from "react-redux";
import commonFunction, { getDateDayMonth } from "@app/utils/common-function";
import utils from '@app/utils';
import { selectImageVariant } from '@app/utils/image';
import { getImageFromURL, IMAGES } from "@app/constants/images";
import { BasketBaseScreenProps, selectedItemProps } from "@app/utils/interface";
import { fetchPastData, fetchUpcomingData } from "@screen/my-deliveries/deliveriesActions";
import BottomPopUp from "@app/components/bottom-popup";
import { updatePaymentStatus } from '@app/screens/checkout/order/orderAction';


const Receipt = (props: BasketBaseScreenProps) => {
    const dispatch = useDispatch()
    const [receiptNumber, setReceiptNumber] = useState<string>("")
    const backAction = () => {
        props.route.params?.orderSuccess === "success" ?
            props.navigation.reset(
                {
                    index: 0,
                    routes: [{ name: screens.menu.menu.name }]
                }
            )
            : (props.navigation.goBack(),
                dispatch(fetchUpcomingData()),
                dispatch(fetchPastData())
            )
        return true
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        setReceiptNumber(props.route.params?.orderNumber ? props.route.params?.orderNumber : "")
        return () => {
            backHandler.remove();
        }
    }, [props.route.params?.orderNumber])

    const sub = (base: any, exponent: any, baseSecond?: any, dynamicStyle?: any, dynamicSubStyle?: any) => {
        return <View style={styles.mainWrapperSubscript}>
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
    const renderDayWiseFood = (item: any, currentDayDelivery: any) => {
        const splitPrice = item.item.totalPrice.toLocaleString("nl-US", { minimumFractionDigits: 2 }).toString()
        const splitPriceBD = splitPrice.split(',')[0];
        const splitPriceAD = splitPrice.split(',')[1];
        return (
            <View style={[styles.dayWiseMainContainer, { paddingTop: item.index === 0 ? vh(24) : vh(8), paddingBottom: item.index === currentDayDelivery.item?.items.length - 1 ? vh(24) : vh(8) }]}>
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
                                uri: utils.commonFunctions.isNullUndefined(item.item.product.listingPicture) ? '' : selectImageVariant(PixelRatio.getPixelSizeForLayoutSize(vw(140)), item.item.product.listingPicture),
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={{ justifyContent: "space-between", paddingVertical: vh(10) }}>
                        <Text style={styles.nameItem} numberOfLines={2}>{item.item.product.name}</Text>
                        <View style={styles.wrappperPlusMinus}>
                            {
                                <View style={styles.innerWrapperPlusMinus}>
                                    <Text style={styles.countItem}>{`${item.item.count} x`}</Text>
                                </View>
                            }
                            <Text>
                                {(() => sub(`€${splitPriceBD}`, `${splitPriceAD}`, ""))()}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>)
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
    const renderBsktList = (currentItem: any) => {
        return (
            <View style={styles.mainContainerBsktList}>
                <Text style={styles.textDate}>{getDateDayMonth(
                    1,
                    new Date(currentItem.item.date).getDay(),
                    new Date(currentItem.item.date).getMonth(),
                    new Date(currentItem.item.date).getDate()
                )}</Text>
                <View style={styles.mainWrapperEditDate}>
                    <Text style={styles.textDeliveryTime}>{`${t('Delivery_time')}`}: <Text style={styles.textTime}>{toSlot(currentItem.item.deliverySlots)}</Text></Text>
                </View>
                <FlatList
                    data={currentItem.item.items}
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

    const renderCellDayPrice = (currentItem: selectedItemProps) => {
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
        return (
            <View style={styles.main2}>
                <FlatList
                    data={props.fetchOrderReceiptReducer.receiptOrderData.content.deliveries}
                    renderItem={renderCellDayPrice}
                    listKey={commonFunction.keyFinder()}
                />
            </View>
        )
    }

    const renderBillBreakUp = () => {
        const subTotal = props.fetchOrderReceiptReducer.receiptOrderData.content.priceItemsSum;
        const deliveryPriceForTotal = props.fetchOrderReceiptReducer.receiptOrderData.content.priceDeliveriesSum;
        const priceBreakUpForDelivery = deliveryPriceForTotal.toLocaleString("nl-US", { minimumFractionDigits: 2 })
        const priceBreakUpRorSub = subTotal.toLocaleString("nl-US", { minimumFractionDigits: 2 })
        const deliveryChargeForSingle = props.fetchOrderReceiptReducer.receiptOrderData.content.deliveries[0].priceDelivery
        const deliveryChargeBreakUpRorSub = deliveryChargeForSingle.toLocaleString("nl-US", { minimumFractionDigits: 2 })
        const totalPrice = props.fetchOrderReceiptReducer.receiptOrderData.content.priceTotalSum;
        const totalPriceBreakUp = totalPrice.toLocaleString("nl-US", { minimumFractionDigits: 2 });
        const descountedPriceBreakUp = props.fetchOrderReceiptReducer?.receiptOrderData.content?.priceDiscountSum;
        const updateDescountedPriceBreakUp = descountedPriceBreakUp?.toLocaleString("nl-US", { minimumFractionDigits: 2 })
        return (
            <>
                <View style={styles.billBreakerWrapper}>
                    <Text style={styles.textDay}>{`${t('subTotal')}`}</Text>
                    <Text>
                        {
                            (() => sub(`€${priceBreakUpRorSub.split(',')[0]}`, `${priceBreakUpRorSub.split(',')[1]}`, ` ${""}`,
                                {
                                    fontFamily: fonts.poppinsSemiBold,
                                    fontSize: vw(16),
                                    color: colors.color_rgba_0_0_0_7,
                                    lineHeight: vw(20),
                                },
                                { fontSize: vw(8), }
                            ))()
                        }
                    </Text>
                </View>

                {
                    props.fetchOrderReceiptReducer.receiptOrderData?.content?.priceDiscountSum &&
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "90%",
                        alignSelf: "center",
                        paddingVertical: vh(8)
                    }}>
                        <Text style={styles.textDay}>{`${t('Promotion')}`}</Text>
                        <Text>
                            {
                                (() => sub(`- €${updateDescountedPriceBreakUp.split(',')[0]}`, `${updateDescountedPriceBreakUp.split(',')[1]}`, ` ${""}`,
                                    {
                                        fontFamily: fonts.poppinsBold,
                                        fontSize: vw(16),
                                        color: colors.color_33D15F,
                                        lineHeight: vw(20),
                                    },
                                    {
                                        fontSize: vw(8),
                                        color: colors.color_33D15F,
                                        fontFamily: fonts.poppinsBold,
                                    }
                                ))()
                            }
                        </Text>
                    </View>
                }
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
                    alignSelf: "center",
                    paddingVertical: vh(8)
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textDay}>{`${t('deliveryCharges')}(`}</Text>
                        < Text>{
                            (() => sub(`€${deliveryChargeBreakUpRorSub.split(',')[0]}`, `${deliveryChargeBreakUpRorSub.split(',')[1]}`, ` ${""}`,
                                {
                                    fontSize: vw(12),
                                    lineHeight: vw(17),
                                    color: colors.color_rgba_0_0_0_7,
                                    fontFamily: fonts.poppinsSemiBold,
                                },
                                { fontSize: vw(8) }
                            ))()
                        } </Text>
                        <Text style={styles.textDay}>{`x ${props.fetchOrderReceiptReducer.receiptOrderData.content.countDeliveries}${' days'}`})</Text>
                    </View>
                    <Text>
                        {
                            (() => sub(`€${priceBreakUpForDelivery.split(',')[0]}`, `${priceBreakUpForDelivery.split(',')[1]}`, ` ${""}`,
                                {
                                    fontFamily: fonts.poppinsSemiBold,
                                    fontSize: vw(16),
                                    color: colors.color_rgba_0_0_0_7,
                                    lineHeight: vw(20),
                                },
                                { fontSize: vw(8), }
                            ))()
                        }
                    </Text>
                </View>
                <View style={styles.billBreakerWrapper}>
                    <Text style={{
                        fontSize: vw(14),
                        lineHeight: vw(17),
                        color: colors.color_1B194B,
                        fontFamily: fonts.poppinsSemiBold,
                    }}>{`${t('total')}`}</Text>
                    <Text>
                        {
                            (() => sub(`€${totalPriceBreakUp.split(',')[0]}`, `${totalPriceBreakUp.split(',')[1]}`, ` ${""}`,
                                {
                                    fontFamily: fonts.poppinsSemiBold,
                                    fontSize: vw(22),
                                    color: colors.color_1B194B,
                                    lineHeight: vw(29),
                                },
                                {
                                    fontSize: vw(8),
                                    color: colors.color_1B194B,
                                }
                            ))()
                        }
                    </Text>
                </View>
            </>

        )
    }

    const renderTotalndDelivery = () => {
        return (
            <View style={styles.textTotalNd}>
                {
                    renderBillBreakUp()
                }
            </View>
        )
    }

    const renderPricingSummary = () => {
        return (
            <View style={{ paddingBottom: vh(10) }}>
                {renderSeperatorView()}
                {renderDaywisePriceSummary()}
                {renderSeperatorView()}
                {renderTotalndDelivery()}
            </View>
        )
    }
    const renderHeader = () => {
        return (
            <View style={styles.dataContainer}>
                <View style={styles.renderHeaderContainer}>
                    <View style={styles.detailsContainer}>
                        <Image source={getImageFromURL(IMAGES.USER_ICON)} />
                        <Text style={styles.nameText}>{props.fetchOrderReceiptReducer.receiptOrderData?.customerName}</Text>
                    </View>
                    <View style={[styles.detailsContainer, { marginTop: 20, }]}>
                        <Image source={getImageFromURL(IMAGES.PHONE_ICON_WITH_COLOR)} />
                        <Text style={[styles.nameText, {
                            marginStart: 7,
                        }]}>{props.fetchOrderReceiptReducer.receiptOrderData?.phone}</Text>
                    </View>
                    <View style={[styles.detailsContainer, { marginTop: 20, }]}>
                        <Image source={getImageFromURL(IMAGES.LOCATION_ICON)} />
                        <Text style={[styles.nameText, {
                            marginStart: 10,
                        }]}>{`${props.fetchOrderReceiptReducer.receiptOrderData?.address.street} ${props.fetchOrderReceiptReducer.receiptOrderData?.address.houseNumber}, ${props.fetchOrderReceiptReducer.receiptOrderData?.address.postalCode}`}</Text>
                    </View>
                </View>
            </View>
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
                    title={`${t("order")} ${receiptNumber}`}
                    mainContainer={styles.headerMainContainer}
                    titleStyle={styles.headerTitleStyle}
                    leftPress={() => {
                        props.route.params?.orderSuccess === "success" ?
                            props.navigation.reset(
                                {
                                    index: 0,
                                    routes: [{ name: screens.menu.menu.name }]
                                }
                            )
                            : (props.navigation.goBack(),
                                dispatch(fetchUpcomingData()),
                                dispatch(fetchPastData())
                            )
                    }
                    }
                />
                <View style={styles.basketViewMain}>
                    {!props.fetchOrderReceiptReducer.isLoading ?
                        <FlatList
                            data={props.fetchOrderReceiptReducer.receiptOrderData.content?.deliveries}
                            ListHeaderComponent={() => renderHeader()}
                            renderItem={renderBsktList}
                            ListFooterComponent={props.fetchOrderReceiptReducer.receiptOrderData.content.deliveries.length > 0 ? renderPricingSummary() : null}
                            listKey={commonFunction.keyFinder()}
                            ListEmptyComponent={emptyView}
                        /> :
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <ActivityIndicator size={'large'} />
                        </View>
                    }
                </View>
                {
                    props.storeOrderNumberReducer.paymentStatus === "success" && <BottomPopUp
                        visible={props.storeOrderNumberReducer.paymentStatus === "success"}
                        buttonTitle={`${t('close')}`}
                        ButtonPress={() => dispatch(updatePaymentStatus(""))}
                        headerText={`${t('OrderReceived')}`}
                        messageText1={`${t('WeHopeYouWillEnjoyOurMealsCheckYour')}`}
                        messageText2={`${t('inboxForMoreInfosAndContactUsIfYouWant')}`}
                        messageText3={`${t('toChangeSomething')}`}
                        ButtonPressCross={() => dispatch(updatePaymentStatus(""))}
                    />
                }
            </SafeAreaView>

        </>
    )
}
function mapStateToProps(state: any) {
    const { fetchOrderReceiptReducer, storeOrderNumberReducer } = state
    return {
        fetchOrderReceiptReducer, storeOrderNumberReducer
    }
}

export default connect(
    mapStateToProps,
    null
)(Receipt)