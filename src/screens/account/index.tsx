import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StatusBar, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { colors, screens, vw, appConstants, firebase } from '@app/constants';
import { PrimaryHeader } from '@app/components';
import { styles } from '@screen/account/styles';
import { data } from '@screen/account/data';
import { t } from 'i18next';
import { getImageFromURL, IMAGES } from '@app/constants/images';
import { useDispatch } from 'react-redux';
import authTypes from "@screen/auth/authAction/types";
import { onSignOut,logEvent, setCurrentScreen } from "@app/utils/firebase/analytics"

export declare type UseState = {
    id: number;
    title: string;
    imageName: any;
}[];
interface ProfileProps {
    navigation: any,
    route: any,
}
const Account = (props: ProfileProps) => {
    const [profileData, setProfileData] = useState<UseState>(data)
    const { email } = useSelector((state: { authReducer: any }) => ({
        email: state.authReducer.loginEmail,
    }));
    const dispatch = useDispatch()
    const toLogoutUser = () => {
        dispatch({
            type: authTypes.LOGOUT
        })
    }

    useEffect(() => {
        setCurrentScreen(screens.account.account.name, screens.account.account.title)
    }, [])

    const handle = (item: any) => {
        switch (item.title) {
            case `${t('MyDeliveries')}`:
                props.navigation.navigate(screens.account.MyDeliveries.name)
                break;
            case `${t('AccountSettings')}`:
                props.navigation.navigate(screens.account.AccountSetting.name)
                break;
            case `${t('Language')}`:
                props.navigation.navigate(screens.account.Language.name)
                break;
            case `${t('FAQ')}`:
                props.navigation.navigate(screens.account.FAQ.name)
                break;
            case `${t('Contactus')}`:
                props.navigation.navigate(screens.account.Contactus.name)
                break;
            case `${t('Termsandconditions')}`:
                props.navigation.navigate(screens.account.Termsconditions.name)
                break;
            case `${t('Privacypolicy')}`:
                props.navigation.navigate(screens.account.Privacypolicy.name)
                break;
            case `${t('logout')}`:

                Alert.alert(
                    "Eatch",
                    t("doYouWantToLogout"),
                    [
                        {
                            text: t("cancel"),
                            style: "cancel"
                        },
                        { text: t("ok"), onPress: () => { 
                            let LogEvent = {
                                email,
                                eventType: firebase.analtyics.ANALYTICS_LOGOUT,
                                eventMessage: "User logout"
                            }
                            logEvent(firebase.analtyics.ANALYTICS_LOGOUT, LogEvent)
                            onSignOut()
                            toLogoutUser() 
                        } }
                    ]
                );
                break;
            default:
                null
        }
    }

    const renderItem = ({ item }: any) => {
        return (<>
            <TouchableOpacity style={styles.listContainer} activeOpacity={.8} onPress={() => handle(item)}>
                <View style={styles.textAndLeftIconWrapper}>
                    <Image source={getImageFromURL(item.imageName)} />
                    < Text style={styles.textWrapper}> {item.title}</Text>
                </View>
                {item.id < profileData.length && <Image source={getImageFromURL(IMAGES.ARROW_RIGHT_ICON)} />}
            </TouchableOpacity>
            {item.id < profileData.length && <View style={styles.bottomLineStyle}></View>}
        </>)
    };

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <View style={styles.addressContainer}>
                    <PrimaryHeader
                        iconSize={vw(22)}
                        iconColor={colors.blackColor}
                        left={"left"}
                        title={`${t('Account')}`}
                        mainContainer={styles.headerMainContainer}
                        titleStyle={styles.headerTitleStyle}
                        leftPress={() => props.navigation.goBack()}
                    />
                </View>
                <FlatList
                    data={profileData}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                />
                <View style={styles.bottomView}>
                    <Text style={styles.versionStyle}>{`${t("version")}`} {Platform.OS === "ios" ? appConstants.IOS_VERSION : appConstants.ANDROID_VERSION}</Text>
                </View>
            </SafeAreaView>

        </>
    )
}
export default Account;
