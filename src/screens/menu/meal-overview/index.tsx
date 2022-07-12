import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    ScrollView,
    Image,
    PixelRatio,
    ActivityIndicator,
    Platform,
    Modal,
    TouchableOpacity,
    NativeModules,
} from 'react-native';
import { vw, colors, vh, appConstants } from '@app/constants'; import {
    useDispatch,
    connect
} from 'react-redux';
import { selectImageVariant } from '@app/utils/image';
import {
    PrimaryHeader,
    ClickableImage,
    CustomFastImage
} from "@app/components";
import { styles, mealIngredientText } from "@screen/menu/meal-overview/styles";
import FastImage from "react-native-fast-image";
import RenderHtml from 'react-native-render-html';
import utils from '@app/utils';
import { t } from 'i18next';
import { setMealOverViewData } from "@app/screens/menu/menu/menuAction/menuAction";
import { increaseDecreaseBasketQuantity } from "@screen/basket/basketAction/basketAction";
import basketTypes from "@screen/basket/basketAction/types";
import { getImageFromURL, IMAGES } from '@app/constants/images';
import { FlatList } from 'react-native-gesture-handler';
import { MealOverviewScreenProps, Quality } from '@app/utils/interface';

const MealOverview = (props: MealOverviewScreenProps) => {
    const dispatch = useDispatch()
    const [showLearnMore, setShowLearnMore] = useState<boolean>(false)
    const qualityData = [
        { title: t("aUniqueHomeDining") },
        { title: t("noDirtyCleanup") },
        { title: t("zeroPackagingWaster") }
    ]
    const handleIncrDecrBasketQuantity = (increment: boolean) => {
        if (props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}`) {
            manageProductBasketQuantity(increment)
        }
    }
    const manageProductBasketQuantity = (increment: boolean) => {
        dispatch({
            type: basketTypes.HANLDE_LOADER_ADD_REMOVE_BASKET,
            isLoading: true
        })
        const dataForBasket = {
            date: props.meal.date,
            deliverySlot: props.meal.deliverySlot,
            productId: props.meal.id,
            variant: props.meal.variants.variants[0].code,
            count: increment ? props.meal.count + 1 : props.meal.count - 1,
            basketScreen: true
        }
        dispatch(increaseDecreaseBasketQuantity(dataForBasket))
        const updatedData = {
            ...props.meal,
            count: increment ? props.meal.count + 1 : props.meal.count - 1
        }
        dispatch(setMealOverViewData(updatedData))
    }

    const deviceLanguage = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;



    const renderLearnMore = () => {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={showLearnMore}
                onRequestClose={() => {
                    setShowLearnMore(false);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowLearnMore(false); }}
                    style={styles.modalContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.modalDataContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { setShowLearnMore(false); }}
                            style={{ alignSelf: "flex-end" }}
                            hitSlop={styles.hitSlop}
                        >
                            <Image
                                style={styles.crossImage}
                                source={getImageFromURL(IMAGES.CROSS_LOGO)}
                            />
                        </TouchableOpacity>
                        <View style={styles.knifeForkContainer}>
                            <Image
                                style={styles.knifeForkImage}
                                source={getImageFromURL(IMAGES.KNIFE_FORK)}
                            />
                        </View>
                        <View style={{
                            marginTop: vh(12),
                        }}>
                            <Text style={styles.tablewareText}>{`${t("tableware")}`}</Text>
                        </View>
                        <View style={{
                            marginTop: vh(30),
                            paddingHorizontal: vh(0),
                        }}>
                            <Text style={styles.youDeserveText}>{`${t("youDeserveBest")}`}</Text>
                        </View>
                        <View style={{
                            marginTop: vh(24),
                            paddingHorizontal: deviceLanguage === "en_US" ? 20 : 15,
                        }}>
                            <Text style={styles.thatWhyAllDishesText}>{`${t("thatWhyAllDishesServed")}`}</Text>
                        </View>
                        <View style={{
                            marginTop: vh(15),
                        }}>
                            <FlatList
                                data={qualityData}
                                renderItem={renderQuality}
                            />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }
    const renderQuality = ({ item, index }: { item: Quality, index: number }) => {
        return (
            <View style={styles.qualityContainer}>
                <Image
                    style={styles.checkImage}
                    source={getImageFromURL(IMAGES.CHECK_ICON)}
                />
                <Text style={styles.qualityText}>{item.title}</Text>
            </View>
        )
    }
    const renderItem = (item: any) => {
        return (
            item.index < 2 &&
            <TouchableOpacity activeOpacity={1} style={styles.menuCategoryContainer}>
                <Text style={styles.tagTextColor}>
                    {(item.item.name).toUpperCase()}
                </Text>
            </TouchableOpacity >

        )
    }
    return (
        <>
            <StatusBar hidden={Platform.OS === "ios" ? true : false} barStyle={'dark-content'} />
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.dataContainer}>
                    <View style={styles.mealImage}>
                        <CustomFastImage
                            width={vw(375)}
                            height={vw(375)}
                            style={styles.menuImage}
                            source={{
                                uri: utils.commonFunctions.isNullUndefined(props.meal?.listingPicture) ? '' : selectImageVariant(PixelRatio.getPixelSizeForLayoutSize(vw(375)), props.meal?.listingPicture),
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={styles.mealTitleAndDescriptionContainer}>
                        <Text style={styles.mealTitle}>{props.meal?.name}</Text>
                        <View style={styles.mealDescriptionContainer}>
                            <Text style={styles.mealDescription}>{props.meal?.summary}</Text>
                        </View>
                        <FlatList
                            data={props.meal.tags}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            horizontal={true}
                        />
                        <View style={styles.priceAndAddItemContainer}>
                            <View style={styles.priceAndCategoryContainer}>
                                <Text style={styles.mealPriceText}>€{props.meal.variants?.variants[0].price.toLocaleString("nl-US", { minimumFractionDigits: 2 })}</Text>
                                {/* <View style={styles.mealCategoryContainer}>
                                    <Text style={styles.mealCategoryText}>{t("vg").toUpperCase()}</Text>
                                </View> */}
                            </View>
                            {
                                props.menuReducer.selectedTimeSlot !== `${t("passed")} ${t("slots")}` &&
                                (
                                    props.menuReducer.selectedMeal?.limitedAvailability === 0 ?
                                        (
                                            <View style={styles.soldOutContainer}>
                                                <Text numberOfLines={1} style={styles.soldOuTText}>{t('soldOut')}</Text>
                                            </View>
                                        )
                                        :
                                        (
                                            props.basketReducer.isLoading ? (
                                                <View style={styles.loaderContainer}>
                                                    <ActivityIndicator color={colors.splashPrimary} size={"small"} />
                                                </View >) :
                                                (
                                                    <View style={styles.priceAndCategoryContainer}>
                                                        {
                                                            props.meal.count > 0 &&
                                                            <ClickableImage
                                                                _imagePath={getImageFromURL(IMAGES.MINUS_ICON)}
                                                                _onPress={() => { handleIncrDecrBasketQuantity(false) }}
                                                                buttonStyle={styles.wrapperClickableImage}
                                                                _hitSlop={appConstants.HIT_SLOPE}
                                                            />
                                                        }
                                                        <TouchableOpacity
                                                            activeOpacity={1}
                                                            onPress={() => {
                                                                props.menuReducer.selectedTimeSlot === "Passed slots" ? null :
                                                                    (props.meal.count === 0 ? handleIncrDecrBasketQuantity(true) : null)
                                                            }}>
                                                            <Text
                                                                style={[styles.addItemText,
                                                                {
                                                                    marginStart: props.meal.count === 0 ? 0 : vw(10),
                                                                    color: props.meal.count === 0 ? colors.color_1B463C : colors.blackColor
                                                                }
                                                                ]}>{props.meal.count === 0 ? t("addItem") : props.meal.count}</Text>
                                                        </TouchableOpacity>
                                                        <ClickableImage
                                                            _imagePath={getImageFromURL(IMAGES.PLUS_ICON)}
                                                            _onPress={() => { props.menuReducer.selectedTimeSlot === "Passed slots" ? null : handleIncrDecrBasketQuantity(true) }}
                                                            buttonStyle={styles.plusImage}
                                                            _hitSlop={appConstants.HIT_SLOPE}
                                                        />
                                                    </View>
                                                )
                                        )
                                )
                            }

                        </View>
                        <View
                            style={[styles.divider, { marginTop: vh(26) }]}
                        />
                        <View style={styles.learnMoreContainer}>
                            <Image
                                source={getImageFromURL(IMAGES.KNIFE_FORK)}
                            />
                            <Text style={styles.mealServedText}>{`${t("servedOnTableware")}`}</Text>
                            <Text onPress={() => { setShowLearnMore(true); }} style={styles.mealLearMoreText}>{`${t("learnMore")}`}</Text>
                        </View>
                        <View
                            style={styles.divider}
                        />
                    </View>
                    <View style={styles.ingredientTextContainer}>
                        <Text style={styles.ingredientText}>{`${t("ingredients")}`}</Text>
                    </View>
                    <View style={styles.mealIngredientContainer}>
                        <RenderHtml
                            contentWidth={vw(335)}
                            source={{ html: `<p>${props.meal?.htmlIngredients}</p>` }}
                            tagsStyles={mealIngredientText}
                        />
                    </View>
                </ScrollView>
                <PrimaryHeader
                    iconSize={vw(22)}
                    iconColor={colors.blackColor}
                    left={"left"}
                    title={""}
                    mainContainer={styles.headerMainContainer}
                    titleStyle={styles.headerTitleStyle}
                    leftPress={() => props.navigation.goBack()}
                />
            </SafeAreaView>

            {showLearnMore && renderLearnMore()}
        </>
    )
}
function mapStateToProps(state: any) {
    const { menuReducer, basketReducer } = state
    return {
        meal: menuReducer.selectedMeal,
        basketList: basketReducer.basketList,
        basketReducer,
        menuReducer
    }
}

export default connect(
    mapStateToProps,
    null
)(MealOverview)
