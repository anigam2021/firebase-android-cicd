//Please use camel case for the naming of the endpoints.
const endpoints = {
   getChallengeId: "/identity/challengeId",
   mailSignInLink: '/identity/mailSignInLink',
   signInWithEmailLink: '/identity/signInWithEmailLink',
   menuLink: '/app/menu/list',
   refreshToken: '/identity/refresh',
   basketList: "/app/basket",
   accountProfile: "/app/account/profile/",
   deliveryInstructions: "/app/account/profile/deliveryInstructions",
   addAddress: "/app/account/profile/address",
   phoneNumber: "/app/account/profile/phone",
   name: "/app/account/profile/name",
   bankName: "/app/order/ideal/issuers",
   placeOrder: "/app/order",
   upcomingDelivery: "/app/order/deliveries/upcoming",
   pastDelivery: "/app/order/deliveries/past",
   orderReceipt: "/app/order",
   language: "/app/account/profile/language",
   faqList: '/app/content/faq',
   termsConditionView: '/app/content/terms',
   termsCondition: "/app/content/terms",
   privacyPolicy: "/app/content/privacyPolicy",
   contactUs: "/app/content/contact/support",
   promoCode: '/app/basket/promotion'
}

export default endpoints;