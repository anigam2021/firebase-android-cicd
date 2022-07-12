import { ColorValue, ImageSourcePropType, KeyboardTypeOptions, LayoutChangeEvent, NativeSyntheticEvent, ReturnKeyTypeOptions, StyleProp, TextInputFocusEventData, TextInputScrollEventData, TextStyle, ViewStyle } from "react-native"
export interface MenuItems {
    count: number,
    id: string,
    listingPicture: {
        url: string
    },
    name: string,
    summary: string,
    variants: any,
    limitedAvailability: number
}
export interface CurrentItems {
    count: number,
    htmlIngredients: string,
    id: string,
    listingPicture: any,
    name: string,
    summary: string,
    variants: any
    type: string,
}
export interface TimeSlot {
    isSelected: boolean,
    isvalidNow: boolean,
    name: string,
    start: string,
    end: string,
    cutoff: string,
    limitedAvailability?: number
}
export interface currentDate {
    closed: boolean,
    date: string,
    deliverySlots: [],
    products: any
}
export interface selectedItemProps {
    index: number,
    item: Item,
    separators: any

}
export interface Item {
    date: string,
    deliverySlot: string,
    deliverySlots: [
        {
            name: string,
            cutoff: string,
            start: string,
            end: string
        }
    ],
    items: [
        {
            count: number,
            totalPrice: number,
            products: {
                htmlIngredient: string,
                id: string,
                name: string,
                summary: string,
                type: string,
                listingPicture: {
                    url: string
                },
                variants: {
                    defaultVariant: string,
                    variants: [
                        {
                            code: string,
                            price: number
                        }
                    ]
                }
            }

        },
        variants: [
            {
                count: number,
                totalPrice: number
                variant: string
                variantPrice: number
            }
        ]
    ],
    priceDelivery: number,
    priceItemsSum: number
}
export interface BillBreakUp {
    index: number,
    item: value
}
export interface value {
    deliverySum: any
    title: string,
    value: number,
    deliveryDays: string
}
export interface DayWiseFood {
    index: number,
    item: {
        count: number,
        totalPrice: number,
        variants: [
            variant: string,
            count: number,
            totalPrice: number,
            variantPrice: number
        ],

        product: {
            id: string,
            type: string,
            name: string,
            summary: string,
            htmlIngredients: string,
            limitedAvailability?: number,
            variants: {
                defaultVariant: string,
                variants: [
                    code: string,
                    price: number
                ]
            },
            listingPicture: {
                url: string
            }
        }
    }

}
export interface DayDelivery {
    deliverySlots(deliverySlots: any): string
    deliverySlot: any
    index: number,
    item: {
        date: string,
        deliverySlot: string,
        deliverySlots: [{
            name: string,
            cutoff: string,
            start: string,
            end: string
        }
        ],
        items: [
            count: number,
            totalPrice: number,
            variants: [
                variant: string,
                count: number,
                variantPrice: number,
                totalPrice: number
            ],
            product: {
                htmlIngredients: string,
                id: string,
                name: string,
                summary: string,
                type: string,
                variants: {
                    defaultVariant: string,
                    variants: [
                        code: string,
                        price: number
                    ]
                },
                listingPicture: {
                    url: string
                }

            },
            totalPrice: number,
        ],
        priceItemsSum: number,
        priceDelivery: number
    },
    separators: any
}
export interface Quality {
    title: string
}
export interface Drawerlist {
    state: stateForDrawerList,
}
export interface navigationForDrawerList {
    emit: (arg0: { type: string; target: string | number; canPreventDefault: boolean }),
    navigate: (arg0: { name: any; merge: boolean })

}
export interface descriptorsForDrawerList {
    descriptors: []
}
export interface stateForDrawerList {
    default: string,
    index: number,
    key: string,
    stale: boolean,
    type: string,
    history: subhistory,
    routeNames: [],
    routes: []
}
export interface subhistory {
    0: subsubhistory,
    1: subsubhistory
}
export interface subsubhistory {
    key: string,
    type: string
}
export interface drawerIconForDrawerList {
    activeIcon: ImageSourcePropType
    drawerIcon: {
        activeIcon: number
    },
}
export interface sublabel {
    label: string
}
export interface basket {
    count: number,
    variant: [],
    product: {},
    totalPrice: number,

}
export interface SubslotsArray {
    map(arg0: (element: any) => void)
    i: [
        {
            name: string,
            cutoff: string,
            start: string,
            end: string,
            isSelected: boolean
        }
    ]
}
export interface subBillBreakUp {
    index: number,
    item: {
        deliveryDays: string,
        deliverySum: string,
        title: string,
        value: number
    }
}
export interface TimeSlotView {
    index: number,
    item: {
        cutoff: string,
        end: string,
        isSelected: boolean,
        name: string,
        start: string,
        limitedAvailability?: number
    }
}
export interface keyboard {
    duration: number,
    easing: string,
    endCoordinates: {
        height: number,
        screenX: number,
        screenY: number
        width: number
    },
    isEventFromThisApp: boolean,
    startCoordinates: {
        screenY: number,
        width: number,
        screenX: number,
        height: number
    }
}
export interface basketAction {
    basketScreen?: boolean,
    count?: number,
    date?: string,
    deliverySlot: string,
    keepZero?: boolean,
    productId?: string,
    variant?: string
}
export interface ActivityIndicatorProps {
    mainViewWrapper?: Object | Array<Object>,
    inidicatorColor?: string,
    sizeIndicator?: any
}
export interface ClickableImageProps {
    _onPress: any;
    _imagePath: any;
    imageStyle?: Object;
    buttonStyle?: Object;
    _resizeMode?: any;
    _hitSlop?: object
}
export interface CustomButtonProps {
    isLeft?: boolean,
    isRight?: boolean,
    onPress?: () => void,
    imageLeft?: any,
    touchablestyle?: any,
    textstyle?: any,
    imageRight?: any,
    title: string,
    imageLeftStyle?: any,
    imageRightStyle?: any,
    activeopacity?: any,
    isdisabled?: boolean,
    onlongpress?: () => void,
    onfocus?: () => {},
    onblur?: () => {},
    isLoading?: boolean
}
export interface MenuDateAndTimeCardProps {
    date: string,
    day: string,
    isSelected: boolean,
    onPress: Function,
    validDate: boolean,
    isValidButClosed: boolean
}
export interface MenuItemProps {
    menuImage: string,
    menuTitle: string,
    menuSummary: string,
    menuCategory: string,
    quantitySelected: number,
    onPressIncr: Function,
    onPressDcr: Function,
    currentItem: any,
    loading: boolean,
    dynamicStyle?: any,
    dynamicSubStyle?: any,
    base: string,
    exponent: string,
    onPressTitle: Function,
    slotPassed: boolean,
    soldOut: boolean,
    soldOutText: string
}
export interface TimeSlotMenuProps {
    isSelected: boolean,
    slotTime: string,
    onPress: Function,
    isValidNow: boolean
}
export interface CheckoutAddressDeliveryCardProps {
    image: any,
    title: string,
    subTitle: string,
    onPress: Function,
    subTitleMarginStart?: number
    bankLogoImage?: any
}
export interface DeliverySlotCheckoutProps {
    title: string,
    renderDeliverySlot: any
}
export interface InputProps {
    placeholder?: string | undefined,
    style?: any,
    secureTextEntry?: boolean | undefined,
    allowFontScaling?: boolean,
    autoCorrect?: boolean | undefined,
    caretHidden?: boolean | undefined,
    numberOfLines?: number,
    scrollEnabled?: boolean,
    onChangeText?: Function,
    onSubmitEditing?: ((text: string) => void) | undefined,
    leftIcon?: boolean,
    rightIcon?: boolean,
    rightIconSource?: any,
    maxLength?: number,
    textInputStyle?: StyleProp<TextStyle>
    onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined,
    placeholderTextColor?: any,
    value?: string | undefined,
    onScroll?: ((e: NativeSyntheticEvent<TextInputScrollEventData>) => void) | undefined,
    leftIconSource?: any,
    selectTextOnFocus?: any,
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
    selectionColor?: any,
    textAlign?: "left" | "right" | "center" | undefined
    underlineColorAndroid?: ColorValue | undefined,
    onBlur?: any
    blurOnSubmit?: boolean | undefined,
    keyboardType?: KeyboardTypeOptions | undefined,
    editable?: boolean | undefined,
    changeBorderColor?: boolean,
    textInputBorderColor?: any,
    textInputBorderWidth?: number,
    rejectResponderTermination?: boolean | null | undefined,
    returnKeyType?: ReturnKeyTypeOptions | undefined,
    onLayout?: ((event: LayoutChangeEvent) => void) | undefined,
    multiline?: boolean,
    textBreakStrategy?: "simple" | "highQuality" | "balanced" | undefined,
    showSoftInputOnFocus?: any,
    texInputWidth?: any,
    texInputheight?: any,
    leftIconHeight?: any,
    leftIconWidth?: any,
    rightIconHeight?: any,
    rightIconWidth?: any,
    textInputBorderRadius?: number,
    leftIconMargin?: number,
    leftIconMarginLeft?: number,
    rightIconMarginLeft?: number,
    rightIconrightSpace?: number,
    textoutput?: boolean,
    text?: string,
    errorMsg?: string,
    isError?: boolean,
    returnKeyLabel?: string,
    showTitle?: boolean
    showTitleText?: boolean,
    titleText?: StyleProp<TextStyle>
    title?: string
    lengthOfText: boolean
}
export interface PopusingChildProps {
    showModal: boolean;
    child: any;
    styleModal: any;
    toCloseModal: Function;
    toCloseWithSwipe: Function;
    swipeDirection: any
}
export interface SeparatorProps {
    separatorContainer: StyleProp<ViewStyle>
}
export interface AppHeaderProps {
    headerBg?: ColorValue
    height?: number
    title?: string
    flex?: number
    titleAlign?: "auto" | "left" | "right" | "center" | "justify"
    titleStyle?: StyleProp<TextStyle>
    menu?: string
    left?: string
    iconColor?: ColorValue
    iconSize?: number
    leftPress?: () => void
    menuPress?: () => void
    rightComponent?: boolean
    rightPress?: () => void,
    leftIconWrapperStyle?: any,
    mainContainer?: any,
    rightIcon?: any,
    basketCount?: number

}
export interface FastImageProps {
    activeOpacity?: number
    mormal?: string
    header?: object
    onLoadStart?: void
    onProgress?: void
    onLoad?: void
    onError?: void
    onLoadEnd?: void
    cover?: boolean
    center?: boolean
    contain?: boolean
    stretch?: boolean
    low?: boolean
    normal?: boolean
    high?: boolean
    uri?: string | undefined
    Authorization?: string | undefined
    style?: any,
    width: number,
    height: number,
    source: any,
    resizeMode: any
}
export interface SnackBarProps {

}
export interface SnackbarState {
    distance: number
}
export interface BasketBaseScreenProps {
    navigation: any,
    route: any,
    basketReducer: any,
    checkoutReducer: any,
    fetchOrderReceiptReducer: any,
    storeOrderNumberReducer: any,
    menuReducer: any
}
export interface AddAddressProps {
    navigation: any,
    route: any,
    checkoutReducer: any
}
export interface PaymentProps {
    navigation: any,
    route: any,
    checkoutReducer: any
}
export interface CheckoutProps {
    navigation: any,
    route: any,
    basketReducer: any,
    checkoutReducer: any,
    storeOrderNumberReducer: any,
}
export interface ContactDetailsProps {
    navigation: any,
    route: any,
    checkoutReducer: any
}
export interface DeliveryInstructionProps {
    navigation: any,
    route: any,
    checkoutReducer: any
}
export interface SlotTime {
    slot: string,
    isSelected: boolean
}
export interface MenuProps {
    navigation: any,
    route: any,
    menuReducer: any,
    basketReducer: any,
    email: string
}
export interface MyDeliveriesProps {
    navigation: any,
    route: any,
    checkoutReducer: any,
    fetchUpComingDeliveriesDataReducer: any,
    fetchPastDeliveriesDataReducer: any
}
export interface ListProps {
    navigation?: any,
    route?: any,
    checkoutReducer?: any,
    item: any,
    onPress: any
}
export interface MealOverviewScreenProps {
    menuReducer: any
    navigation: any,
    route: any,
    meal: any,
    basketList: any,
    basketReducer: any
}
export interface BasketBaseScreenProps {
    navigation: any,
    route: any,
    basketReducer: any,
    checkoutReducer: any
}
export interface ImageData {
    url: string
}

// PlaceOrder
export interface Product {
    id: string;
    type: string;
}

export interface Variant {
    variant: string;
    count: number;
}

export interface Item {
    product: Product;
    variants: Variant[];
}

export interface Delivery {
    date: string;
    deliverySlot: string;
    items: Item[];
}


export interface PlaceOrder {
    deliveries: Delivery[];
    paymentMethod: string;
    priceTotalSum: number;
}

export interface LanguageProps {
    navigation: any,
    authReducer: any
}

export interface BottomPopUpProps {
    visible: boolean,
    headerTextStyles?: StyleProp<TextStyle>,
    messageTextStyles?: StyleProp<TextStyle>,
    headerText: string,
    headerText2?: string,
    messageText1: string,
    messageText2?: string,
    messageText3?: string,
    messageText4?: string,
    buttonTitle: string,
    buttonStyle?: StyleProp<ViewStyle>,
    buttonTextStyle?: StyleProp<TextStyle>,
    ButtonPress: any,
    dayDateAndMonth?: string
    slotData?: any
    onPress?: any,
    ButtonPressCross?: any,
    isLoading?: boolean
    activityIndicator?: boolean
}
export interface BottomPopUpPropsForUpdateDelivery {
    visible: boolean,
    headerTextStyles?: StyleProp<TextStyle>,
    messageTextStyles?: StyleProp<TextStyle>,
    headerText: string,
    headerText2?: string,
    messageText1: string,
    messageText2?: string,
    messageText3?: string,
    buttonTitle: string,
    buttonStyle?: StyleProp<ViewStyle>,
    buttonTextStyle?: StyleProp<TextStyle>,
    ButtonPress: any,
    listData: any,
    isLoading?: boolean,
    ButtonPressCross?: any,
}

export interface PromoCodeProps {
    navigation: any,
}