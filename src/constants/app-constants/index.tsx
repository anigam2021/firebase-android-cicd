
//Please use all caps for app constants
export default {
    STATUS_BAR_MODE: ['default', 'dark-content', 'light-content'],
    GET_USERS_LIST_REQUEST: 'GET_USERS_LIST_REQUEST',
    GET_USERS_LIST_SUCCESS: 'GET_USERS_LIST_SUCCESS',
    GET_USERS_LIST_FAILURE: 'GET_USERS_LIST_FAILURE',
    ACTIVE_OPACITY: 0.8,
    HIT_SLOPE: { top: 10, bottom: 10, left: 10, right: 10 },

    FULL_NAME_REGX: /^[\p{L} ,.'-]+$/u,
    PHONE_NUMBER_REGX: /^(06[0-9]{8}|[+0-9]|31[0]?[0-9]{9,10}|0031[0]?[0-9]{9,10})*$/,
    STREET_NAME_REGX: /^[a-zA-z0-9,-.() "`'À-ÖØ-öø-ÿñńćçčŽźżłāśšēėęūīįōœ]*$/,
    HOUSE_NUMBER_REGX: /^\d+[a-zA-Z0-9_. -]*$/,
    HOUSE_NUMBER_REGXFIRSTTEXT: /^\d/,
    POSTAL_NUMBER_REGX: /^\d{4} ?[a-z]{2}$/i,
    DELIVERY_INSTRUCTION_REGX: /^[a-zA-z0-9 ,]{4,50}/,
    ANDROID_VERSION: "1.0.2",
    IOS_VERSION: "1.0.2",
    PROMO_CODE_REGX: "^[A-Za-z0-9_-]*$"
}
