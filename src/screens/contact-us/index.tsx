import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, View, TouchableOpacity, Linking, StatusBar, Platform } from 'react-native'
import {
  PrimaryHeader
} from "@app/components";
import { vw, colors, appConstants } from "@app/constants";
import { t } from 'i18next';
import { getImageFromURL, IMAGES } from "@app/constants/images";
import { connect, useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { fetchContactUsData } from '@app/screens/contact-us/contactusAction/contactusAction';
import { styles } from '@app/screens/contact-us/style';
import commonFunction from "@app/utils/common-function";
import Mailer from 'react-native-mail';

const ContactUs = (props: any) => {
  const deviceId = DeviceInfo.getDeviceId();
  const systemVersion = DeviceInfo.getSystemVersion();
  const dispatch = useDispatch();
  const emailFn = () => {
    if (Platform.OS === "ios") {
      Mailer.mail({
        subject: t("emailSubject"),
        recipients: [props.contactUsReducer?.email?.email?.email],
        body: `<p><p>${t("emailBody")}</p><br><p>${t("deviceModel")}: ${deviceId}</p><p>${t("osVersion")}: ${systemVersion}</p><p>${t("appVersion")}: ${Platform.OS === "ios" ? appConstants.IOS_VERSION : appConstants.ANDROID_VERSION}</p></p>`,
        isHTML: true,
      }, (error, event) => {
        console.log("error");

      });
    } else {
      Linking.openURL(`${t("mailTo")}${props.contactUsReducer?.email?.email?.email}?subject=${t("emailSubject")}&body=${t("emailBody")}\n\n${t("deviceModel")}: ${deviceId}\n${t("osVersion")}: ${systemVersion}\n${t("appVersion")}: ${appConstants.ANDROID_VERSION}`)
    }
  }

  const handleOpenWhatsapp = async () => {
    const url = `https://wa.me/${props.contactUsReducer?.email?.whatsapp?.raw}`
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        commonFunction.showSnackbar(t("sorryWeAreUnableToOpenWhatsapp"))
      }
    }).catch(err => {
      commonFunction.showSnackbar(t("sorryWeAreUnableToOpenWhatsapp"))
    })


  }
  useEffect(() => {
    dispatch(fetchContactUsData())
  }, [])
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
      <SafeAreaView style={styles.container}>
        <PrimaryHeader
          iconSize={vw(22)}
          iconColor={colors.blackColor}
          left={"left"}
          title={t("Contactus")}
          mainContainer={styles.headerMainContainer}
          titleStyle={styles.headerTitleStyle}
          leftPress={() => props.navigation.goBack()}
        />
        <Text style={styles.mainHeadingText}>{`${t("HowCanWeHelp")}`}</Text>
        <Text style={styles.subTextStyle}>{`${t("ContactUsMessage")}`}</Text>
        <View style={styles.buttonMainView}>
          <TouchableOpacity style={styles.mailButtonView} onPress={() => emailFn()}
          >
            <Image source={getImageFromURL(IMAGES.DM_ICON)} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mailButtonView} onPress={() => handleOpenWhatsapp()}>
            <Image source={getImageFromURL(IMAGES.WHTSAPP_ICON)} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}
function mapStateToProps(state: any) {
  const { contactUsReducer } = state
  return {
    contactUsReducer
  }
}
export default connect(
  mapStateToProps,
  null
)(ContactUs)

