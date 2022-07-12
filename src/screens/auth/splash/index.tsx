import React from 'react'
import {
    SafeAreaView,
    View,
    Image,
    StatusBar
} from 'react-native'
import { styles } from './styles';
import { colors } from '@app/constants';
import { useDispatch } from 'react-redux';
import { updateSplashState } from '@app/screens/auth/authAction/authAction';
import { getImageFromURL, IMAGES } from '@app/constants/images';
const Splash = (props: any) => {
    const dispatch = useDispatch();

    const toggleApploading = () => {
        setTimeout(() => {
            dispatch(updateSplashState(false))
        }, 2000);
    }
    React.useEffect(() => {
        toggleApploading()
    }, [])
    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={colors.splashPrimary} />
            <SafeAreaView style={styles.container}>
                <View style={styles.splashMainImageContainer}>
                    <Image source={getImageFromURL(IMAGES.SPLASH_LOGO)}
                        resizeMode="contain"
                        style={styles.splashImage}
                    />
                </View>
            </SafeAreaView >
        </>
    )
}
export default Splash