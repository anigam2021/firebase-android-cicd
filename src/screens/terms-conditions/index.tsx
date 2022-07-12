import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, StatusBar } from 'react-native'
import {
  PrimaryHeader
} from "@app/components";
import { vw, colors, } from "@app/constants";
import { t } from 'i18next';
import { useDispatch, connect } from 'react-redux';
import { fetchTermsConditionViewData } from '@app/screens/terms-conditions/termsConditionsAction/termsConditionsAction';
import RenderHTML from 'react-native-render-html';
import Moment from 'moment';
import { contentViewTextStyle, styles } from '@screen/terms-conditions/style';
import types from "@screen/terms-conditions/termsConditionsAction/types";
import { ShowActivityIndicator } from '@app/components/activity-indicator';
import { getDateDayMonth } from '@app/utils/common-function';

const TermsCondition = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: types.TERMS_CONDITION_LOADER,
      isLoading: true
    })
    dispatch(fetchTermsConditionViewData())
  }, []
  )
  var dates = props.termsConditionReducer.termsConditionView.lastUpdate;
  var date1;
  if (props.authReducer.language === "en") {
    const date = Moment(dates).format('D');
    const dateInNumber = parseInt(date);
    const month = Moment(dates).format('M');
    const monthInNumber = parseInt(month) - 1;
    const year = Moment(dates).format('YYYY');
    date1 = getDateDayMonth(3, 0, monthInNumber, dateInNumber, year)
  } else {
    const date = Moment(dates).format('D');
    const dateInNumber = parseInt(date);
    const month = Moment(dates).format('M');
    const year = Moment(dates).format('YYYY');
    const monthInNumber = parseInt(month) - 1;
    date1 = getDateDayMonth(3, 0, monthInNumber, dateInNumber, year)
  }



  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
      <SafeAreaView style={styles.mainView}>
        <PrimaryHeader
          iconSize={vw(22)}
          iconColor={colors.blackColor}
          left={"left"}
          title={t("Termsandconditions")}
          mainContainer={styles.headerMainContainer}
          titleStyle={styles.headerTitleStyle}
          leftPress={() => props.navigation.goBack()}
        />
        {
          props.termsConditionReducer.isLoading ?
            <ShowActivityIndicator />
            :
            <ScrollView>
              <Text
                style={styles.headingTextStyle}>
                {props.termsConditionReducer.termsConditionView.title}
              </Text>
              <Text
                style={styles.updateTextStyle}>
                {`${t('LastRevised', { date: date1 })}`}
              </Text>
              <View
                style={styles.contentView}>
                <RenderHTML
                  contentWidth={vw(335)}
                  source={{ html: `<p>${props.termsConditionReducer.termsConditionView.html}</p>` }}
                  tagsStyles={contentViewTextStyle}
                />
              </View>
            </ScrollView>
        }

      </SafeAreaView>
    </>
  )
}
function mapStateToProps(state: any) {
  const { termsConditionReducer, authReducer } = state
  return {
    termsConditionReducer,
    authReducer
  }
}
export default connect(
  mapStateToProps,
  null
)(TermsCondition)


