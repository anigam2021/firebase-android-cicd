import React from "react";
import { StyleSheet } from "react-native";
import { vw, vh, colors, fonts } from '@app/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dataContainer: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.primary
    },
    mealImage: {
        width: vw(375),
        height: vw(375),
        backgroundColor: colors.color_E6DCC9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuImage: {
        width: vw(375),
        height: vw(375),
    },
    headerMainContainer: {
        position: "absolute",
        left: vw(26),
        top: vh(38),
    },
    headerTitleStyle: {
        fontSize: vw(18),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_071731
    },
    mealTitleAndDescriptionContainer: {
        padding: vw(20)
    },
    mealTitle: {
        fontFamily: fonts.CheltenhamstdBook,
        fontSize: vw(18),
        lineHeight: vw(22),
        color: colors.blackColor,
    },
    mealDescriptionContainer: {
        width: vw(313),
        marginTop: vh(8)
    },
    mealDescription: {
        fontFamily: fonts.poppinsRegular,
        fontSize: vw(12),
        lineHeight: vw(20),
        color: colors.color_rgba_0_0_0_5
    },
    priceAndAddItemContainer: {
        marginTop: vh(17),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    priceAndCategoryContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    mealPriceText: {
        fontSize: vw(18),
        lineHeight: vw(23),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_rgba_0_0_0_7
    },
    soldOutContainer: {
        width: vw(90),
        paddingVertical: vh(2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.color_DCE3D7,
        borderRadius: vw(24)
    },
    soldOuTText: {
        fontSize: vw(12),
        color: colors.color_rgba_0_0_0_7,
        fontFamily: fonts.poppinsRegular,
        textAlign: "center"
    },
    mealCategoryContainer: {
        width: vw(24),
        height: vw(24),
        borderRadius: vw(4),
        borderColor: colors.color_66F274,
        borderWidth: vw(1),
        justifyContent: "center",
        alignItems: "center",
        marginStart: vw(19)
    },
    mealCategoryText: {
        fontSize: vw(12),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsRegular,
        color: colors.color_404A61
    },
    addItemText: {
        fontSize: vw(12),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_1B463C
    },
    plusImage: {
        marginStart: vw(10),
        width: vh(24),
        height: vh(24)
    },
    loaderContainer: {
        marginEnd: vw(30),
    },
    divider: {
        width: "100%",
        height: 0,
        borderWidth: vw(0.8),
        borderColor: colors.color_rgba_0_0_0_1
    },
    learnMoreContainer: {
        paddingVertical: vh(18),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    mealServedText: {
        fontSize: vw(13),
        lineHeight: vw(16),
        fontFamily: fonts.poppinsRegular,
        color: colors.color_1B194B,
        marginStart: vw(10)
    },
    mealLearMoreText: {
        fontSize: vw(13),
        lineHeight: vw(16),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_1B463C,
        marginStart: vw(10)
    },
    ingredientTextContainer: {
        height: vh(40),
        backgroundColor: colors.color_DCE3D7,
        justifyContent: "center",
        paddingHorizontal: vw(20)
    },
    ingredientText: {
        fontSize: vw(14),
        lineHeight: vw(16),
        fontFamily: fonts.poppinsSemiBold,
        color: colors.color_1B194B,
    },
    mealIngredientContainer: {
        paddingHorizontal: vw(20),
        paddingTop: vh(4),
        paddingBottom: vh(44)
    },
    wrapperClickableImage: {
        height: vh(24),
        width: vh(24)
    },
    //learn more pop up
    modalContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.color_rgba_0_0_0_7,
        paddingTop: vh(250)
    },
    modalDataContainer: {
        backgroundColor: colors.primary,
        height: vh(562),
        paddingVertical: vh(16),
        paddingHorizontal: vw(20),
    },
    hitSlop: {
        top: 10,
        right: 10,
        left: 10,
        bottom: 10
    },
    crossImage: {
        height: vh(12),
        width: vh(12),
    },
    knifeForkContainer: {
        marginTop: vh(22),
        height: vh(36),
        width: vh(36),
        alignSelf: "center"
    },
    knifeForkImage: {
        height: vh(36),
        width: vh(36),
    },
    tablewareText: {
        fontSize: vw(13),
        lineHeight: vw(16),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_1B194B,
        alignSelf: "center",
    },
    youDeserveText: {
        fontSize: vw(30),
        lineHeight: vw(36),
        fontFamily: fonts.CheltenhamstdBook,
        color: colors.blackColor,
        textAlign: "center",
    },
    thatWhyAllDishesText: {
        fontSize: vw(14),
        lineHeight: vw(25),
        fontFamily: fonts.poppinsRegular,
        color: colors.color_rgba_0_0_0_7,
        // alignSelf: "center",
    },
    qualityContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: vh(15),
        paddingHorizontal: vw(7)
    },
    checkImage: { width: vw(16), height: vh(10) },
    qualityText: {
        fontSize: vw(16),
        lineHeight: vw(24),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_rgba_0_0_0_7,
        marginStart: vw(15)
    },
    menuCategoryContainer: {
        // width: vw(24),
        paddingHorizontal: vw(4),
        height: vw(20),
        borderRadius: vw(4),
        borderColor: colors.color_66F274,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginEnd: vh(8),
        marginTop: vh(18),
    },
    tagTextColor: {
        fontSize: vw(10),
        fontFamily: fonts.interSemiBold,
        color: colors.color_rgba_0_0_0_5
    },
})

export const mealIngredientText: any = {
    p: {
        fontSize: vw(12),
        lineHeight: vw(20),
        fontFamily: fonts.poppinsMedium,
        color: colors.color_rgba_0_0_0_5,
    }
}