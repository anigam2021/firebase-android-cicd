import analytics from '@react-native-firebase/analytics';

export const onAppOpen = async () => {
    analytics().logAppOpen().then(() => {
        console.log("log open event created successfully");
    }).catch((err) => {
        console.log("err during log open event", err);
    })
}

export const setCurrentScreen = async (screenClass: string, screenName: string) => {
    await analytics().logScreenView({
        screen_class: screenClass,
        screen_name: screenName
    })
};

interface LogEvent {
    email: string,
    eventType:string;
    eventMessage: string;
}

export const logEvent = async (eventName: string, propertyObject:LogEvent) => {
    console.log("logEvent",propertyObject)
    let payload = {
        email: propertyObject.email.toLowerCase(),
        eventType: propertyObject.eventType.toLowerCase(),
        eventMessage: propertyObject.eventMessage.toLowerCase(),
    } 
    await analytics().logEvent(eventName.toLowerCase(), payload);
}

export const onSignIn = async (userId: any, email: string) => {
    analytics().logLogin({method: 'OTP'});
    analytics().setUserId(userId);
    analytics().setUserProperty('email', email);
}

export const onSignOut = async () => {
    await analytics().resetAnalyticsData();
};
