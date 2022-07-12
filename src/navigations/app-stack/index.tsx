import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '@app/constants';
import MealOverview from '@app/screens/menu/meal-overview';
//Basket
import BasketBaseScreen from '@screen/basket/basketBaseScreen';
//checkout
import Checkout from '@app/screens/checkout/checkout';
import AddAddress from "@app/screens/contact/address/add-address";
import DeliveryInstruction from "@app/screens/contact/delivery-instruction";
import Contactdetails from "@app/screens/contact/contact-details";
import Payment from '@app/screens/checkout/bank';
import Receipt from '@app/screens/checkout/receipt/receipt';
//order

//menu
import menu from '@app/screens/menu/menu/menu';
//Account
import Account from '@app/screens/account';
import PromoCode from '@app/screens/basket/promo-code/index';
import myDeliveries from '@app/screens/my-deliveries';
import accountSetting from '@app/screens/account-setting';
import language from '@app/screens/language';
import faqs from '@app/screens/faqs';
import contactUs from '@app/screens/contact-us';
import termsConditions from '@app/screens/terms-conditions';
import privacyPolicy from '@app/screens/privacy-policy';


const AppStack = createNativeStackNavigator();

const AppNavigation = (props: any) => {
    return (
        <AppStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AppStack.Screen
                name={screens.menu.menu.name}
                component={menu}
            />
            <AppStack.Screen
                name={screens.menu.mealOverview.name}
                component={MealOverview}
            />
            <AppStack.Screen
                name={screens.basket.basket.name}
                component={BasketBaseScreen}
            />
            <AppStack.Screen
                name={screens.checkout.checkout.name}
                component={Checkout}
            />
            <AppStack.Screen
                name={screens.address.addAddress.name}
                component={AddAddress}
            />
            <AppStack.Screen
                name={screens.promoCode.promoCode.name}
                component={PromoCode}
            />
            <AppStack.Screen
                name={screens.deliveryInstruction.deliveryInstruction.name}
                component={DeliveryInstruction}
            />
            <AppStack.Screen
                name={screens.contactDetails.contactDetails.name}
                component={Contactdetails}
            />
            <AppStack.Screen
                name={screens.payment.payment.name}
                component={Payment}
            />
            <AppStack.Screen
                name={screens.receipt.receipt.name}
                component={Receipt}
                options={{ gestureEnabled: false }}
            />
            <AppStack.Screen
                name={screens.account.account.name}
                component={Account}
            />
            <AppStack.Screen
                name={screens.account.MyDeliveries.name}
                component={myDeliveries}
            />
            <AppStack.Screen
                name={screens.account.AccountSetting.name}
                component={accountSetting}
            />
            <AppStack.Screen
                name={screens.account.Language.name}
                component={language}
            />
            <AppStack.Screen
                name={screens.account.FAQ.name}
                component={faqs}
            />
            <AppStack.Screen
                name={screens.account.Contactus.name}
                component={contactUs}
            />
            <AppStack.Screen
                name={screens.account.Termsconditions.name}
                component={termsConditions}
            />
            <AppStack.Screen
                name={screens.account.Privacypolicy.name}
                component={privacyPolicy}
            />
        </AppStack.Navigator>
    )
}
export default AppNavigation

