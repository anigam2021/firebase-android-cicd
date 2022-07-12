import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native'
import {
    PrimaryHeader
} from "@app/components";
import { vw, colors, } from "@app/constants";
import { t } from 'i18next';
import { useDispatch, connect } from 'react-redux';
import { privacyPolicyView } from './privacyPolicyAction/privacyPolicyAction';
import RenderHtml from 'react-native-render-html';
import Moment from 'moment';
import { contentViewTextStyle, styles } from './style';
import types from "./privacyPolicyAction/types";
import { ShowActivityIndicator } from '@app/components/activity-indicator';
import { getDateDayMonth } from '@app/utils/common-function';
const PrivacyPolicy = (props: any) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: types.PRIVACY_POLICY_LOADER,
            isLoading: true
        })
        dispatch(privacyPolicyView())
    }, []

    )
    var dates = props.privacyPolicyReducer.privacyPolicyView.lastUpdate
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
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.color_FFFEF5 }}>
                <PrimaryHeader
                    iconSize={vw(22)}
                    iconColor={colors.blackColor}
                    left={"left"}
                    title={t("Privacypolicy")}
                    mainContainer={styles.headerMainContainer}
                    titleStyle={styles.headerTitleStyle}
                    leftPress={() => props.navigation.goBack()}
                />
                {
                    props.privacyPolicyReducer.isLoading ?
                        <ShowActivityIndicator />
                        :
                        <ScrollView>
                            <Text style={styles.headingTextStyle}>
                                {props.privacyPolicyReducer.privacyPolicyView.title}
                            </Text>
                            <Text style={styles.updateTextStyle}>{`${t('LastRevised', { date: date1 })}`}</Text>
                            <View style={styles.contentView}>
                                <RenderHtml
                                    contentWidth={vw(335)}
                                    source={{ html: `<p>${props.privacyPolicyReducer.privacyPolicyView.html}</p>` }}
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
    const { privacyPolicyReducer, authReducer } = state
    return {
        privacyPolicyReducer,
        authReducer
    }
}

export default connect(
    mapStateToProps,
    null
)(PrivacyPolicy)


