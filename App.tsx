import React, { useEffect } from "react";
import { Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import store from "./src/store";
import { navigationRef } from "./src/navigations/navigation-service";
import SplashScreen from 'react-native-splash-screen';
import Router from '@app/navigations/router/router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@app/store';
import * as RNLocalize from "react-native-localize";
import RNRestart from 'react-native-restart';
import { i18nInitialise } from './src/utils/locales';
import { openURL } from "./src/utils/linking";
import { onAppOpen } from "./src/utils/firebase/analytics"

const App = (props: any) => {
  useEffect(() => {
    onAppOpen()
    RNLocalize.addEventListener("change", handleLocalizationChange);
    SplashScreen.hide();
    Linking.getInitialURL()
      .then(url => {
        url && openURL(url)
      })
      .catch(err => {
        console.log("error", err);
      });
    Linking.addEventListener("url", handleURLListener);
    return () => {
      RNLocalize.removeEventListener("change", handleLocalizationChange);
    }
  }, [])
  const handleURLListener = (event: any) => {
    event.url && openURL(event.url)
  };
  const handleLocalizationChange = () => {
    RNRestart.Restart();
  }
  const onBeforeLift = async () => {
    await i18nInitialise();
  };
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={onBeforeLift}
      >
        <NavigationContainer ref={navigationRef}>
          <Router />
        </NavigationContainer >
      </PersistGate>
    </Provider>
  )
}

export default App
