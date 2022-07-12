import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {screens} from '@app/constants';
import Login from '@app/screens/auth/login';
import VerifyOtp from '@app/screens/auth/verify-otp';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = (props: any) => {

    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AuthStack.Screen
                name={screens.auth.login.name}
                component={Login}
            />
            <AuthStack.Screen
                name={screens.auth.verifyOtp.name}
                component={VerifyOtp}
            />
        </AuthStack.Navigator>
    )
}

export default AuthNavigation

