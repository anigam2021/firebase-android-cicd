export enum IMAGES {
    EATCH_LOGO = 'EATCH_LOGO',
    SPLASH = 'SPLASH',
    CART = 'CART',
    SPLASH_LOGO = 'SPLASH_LOGO',
    CLOSED_LOGO = 'CLOSED_LOGO',
    CALENDER_ICON = 'CALENDER_ICON',
    WALLET_ICON = 'WALLET_ICON',
    DELEVERY_ICON = 'DELEVERY_ICON',
    LOCATION_ICON = 'LOCATION_ICON',
    EDIT_ICON = 'EDIT_ICON',
    EMPTY_BASKET = 'EMPTY_BASKET',
    HELP_BASKET = 'HELP_BASKET',
    MINUS_ICON = 'MINUS_ICON',
    PLUS_ICON = 'PLUS_ICON',
    PHONE_ICON = 'PHONE_ICON',
    LOGOUT_ICON = 'LOGOUT_ICON',
    INFORMATION_ICON = 'INFORMATION_ICON',
    MESSAGE_ICON = 'MESSAGE_ICON',
    SECURITY_SAFE_ICON = 'SECURITY_SAFE_ICON',
    SETTING_ICON = 'SETTING_ICON',
    TABLE_WARE_ICON = 'TABLE_WARE_ICON',
    BAGTICK_ICON = 'BAGTICK_ICON',
    ARROW_RIGHT_ICON = 'ARROW_RIGHT_ICON',
    KNIFE_FORK = 'KNIFE_FORK',
    CONTACT_ICON = 'CONTACT_ICON',
    MYORDER_ICON = 'MYORDER_ICON',
    ARROW_LEFT = 'ARROW_LEFT',
    IDEAL_LOGO = 'IDEAL_LOGO',
    CROSS_LOGO = "CROSS_LOGO",
    CHECK_ICON = "CHECK_ICON",
    USER_ICON = "USER_ICON",
    PHONE_ICON_WITH_COLOR = "PHONE_ICON_WITH_COLOR",
    EMPTY_DELIVERIES = "EMPTY_DELIVERIES",
    LANGUAGE_ICON = "LANGUAGE_ICON",
    DM_ICON = "DM_ICON",
    WHTSAPP_ICON = "WHTSAPP_ICON",
    PLUS_ICON_FAQ = "PLUS_ICON_FAQ",
    PROMO_CODE = "PROMO_CODE",
    DELETE = "DELETE"
}
function getImage(name: string): number {
    let iconName: any
    switch (name) {
        case IMAGES.EATCH_LOGO:
            iconName = require("../../assets/images/EatchLogo/EatchLogo.png")
            break;
        case IMAGES.SPLASH:
            iconName = require("../../assets/images/Splash/Splash.png")
            break;
        case IMAGES.CART:
            iconName = require("../../assets/images/Cart/Cart.png")
            break;
        case IMAGES.SPLASH_LOGO:
            iconName = require('../../assets/images/splashLogo/SplashEatchLogo.png')
            break;
        case IMAGES.CLOSED_LOGO:
            iconName = require('..//../assets/images/closedLogo/we_are_closed.png')
            break;
        case IMAGES.CALENDER_ICON:
            iconName = require("../../assets/images/CalendarIcon/CalendarIcon.png")
            break;
        case IMAGES.WALLET_ICON:
            iconName = require("../../assets/images/WalletIcon/WalletIcon.png")
            break;
        case IMAGES.DELEVERY_ICON:
            iconName = require("../../assets/images/DeliveryIcon/DeliveryIcon.png")
            break;
        case IMAGES.LOCATION_ICON:
            iconName = require("../../assets/images/LocationIcon/LocationIcon.png")
            break;
        case IMAGES.EDIT_ICON:
            iconName = require("../../assets/images/EditIcon/EditIcon.png")
            break;
        case IMAGES.EMPTY_BASKET:
            iconName = require('../../assets/images/emptyBasket/basket_review_empty_state.png')
            break;
        case IMAGES.HELP_BASKET:
            iconName = require('../../assets/images/messageQuestion/message-question.png')
            break;
        case IMAGES.MINUS_ICON:
            iconName = require('../../assets/images/minusIcon/minusIcon.png')
            break
        case IMAGES.PLUS_ICON:
            iconName = require('../../assets/images/plusIcon/plus.png')
            break;
        case IMAGES.PHONE_ICON:
            iconName = require('../../assets/images/PhoneIcon/phoneIcon.png')
            break;
        case IMAGES.LOGOUT_ICON:
            iconName = require('../../assets/images/logoutIcon/logout.png')
            break;
        case IMAGES.INFORMATION_ICON:
            iconName = require('../../assets/images/informationIcon/information.png')
            break;
        case IMAGES.MESSAGE_ICON:
            iconName = require('../../assets/images/messagesIcon/messages.png')
            break;
        case IMAGES.SECURITY_SAFE_ICON:
            iconName = require('../../assets/images/securitySafeIcon/security_safe_Icon.png')
            break;
        case IMAGES.SETTING_ICON:
            iconName = require('../../assets/images/settingIcon/settingIcon.png')
            break;
        case IMAGES.TABLE_WARE_ICON:
            iconName = require('../../assets/images/tablewareIcon/table_ware_Icon.png')
            break;
        case IMAGES.BAGTICK_ICON:
            iconName = require('../../assets/images/bagtickIcon/bagtickIcon.png')
            break;
        case IMAGES.ARROW_RIGHT_ICON:
            iconName = require('../../assets/images/arrowRightIcon/arrow_right_Icon.png')
            break;
        case IMAGES.KNIFE_FORK:
            iconName = require("../../assets/images/KnifeFork/KnifeFork.png")
            break;
        case IMAGES.CONTACT_ICON:
            iconName = require('../../assets/images/contacticon/contact.png')
            break;
        case IMAGES.MYORDER_ICON:
            iconName = require('../../assets/images/myorderIcon/myOrder.png')
            break;
        case IMAGES.ARROW_LEFT:
            iconName = require('../../assets/images/arrowLeft/arrowLeft.png')
            break;
        case IMAGES.IDEAL_LOGO:
            iconName = require('../../assets/images/idealLogo/ideal_logo.png')
            break;
        case IMAGES.CROSS_LOGO:
            iconName = require('../../assets/images/cross/cross.png')
            break;
        case IMAGES.CHECK_ICON:
            iconName = require('../../assets/images/checkIcon/checkIcon.png')
            break;
        case IMAGES.USER_ICON:
            iconName = require('../../assets/images/user/User.png')
            break;
        case IMAGES.PHONE_ICON_WITH_COLOR:
            iconName = require('../../assets/images/heroiconsOutlinePhone/heroicons_outline_phone.png')
            break;
        case IMAGES.EMPTY_DELIVERIES:
            iconName = require('../../assets/images/emptyDeliveriesDataIcon/we_are_closed.png')
            break;
        case IMAGES.LANGUAGE_ICON:
            iconName = require('../../assets/images/language/language.png')
            break;
        case IMAGES.DM_ICON:
            iconName = require('../../assets/images/dm/dm.png')
            break;
        case IMAGES.WHTSAPP_ICON:
            iconName = require('../../assets/images/whatsapp/whatsapp.png')
            break;
        case IMAGES.PLUS_ICON_FAQ:
            iconName = require('../../assets/images/plusIconFaq/plusiconFaq.png')
            break;
        case IMAGES.PROMO_CODE:
            iconName = require('../../assets/images/promocode-icon/promoCode.png')
            break;
        case IMAGES.DELETE:
            iconName = require('../../assets/images/deleteIcon/delete.png')
            break;
        default:
            iconName = null
    }
    return iconName
}

export function getImageFromURL(url: string): number {
    if (url) {
        const name: string = url.substring(url.lastIndexOf('/') + 1);
        return getImage(name);
    }
    return -1;
}
