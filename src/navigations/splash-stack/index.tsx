import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {screens} from '@app/constants';
import Splash from '@app/screens/auth/splash';

const SplashStack = createNativeStackNavigator();

const SplashNavigation = (props: any) => {
    return (
        <SplashStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <SplashStack.Screen
                name={screens.auth.splash.name}
                component={Splash}
                options={{ gestureEnabled: false }}
            />

        </SplashStack.Navigator>
    )
}

export default SplashNavigation

