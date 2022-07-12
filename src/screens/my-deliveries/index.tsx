import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { FlatList, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native'
import {
  PrimaryButton,
  PrimaryHeader
} from "@app/components";
import { vw, colors, vh, screens } from "@app/constants";
import { styles } from '@app/screens/my-deliveries/styles';
import List from '@app/screens/my-deliveries/list';
import { MyDeliveriesProps } from '@app/utils/interface';
import { connect, useDispatch } from 'react-redux';
import { fetchPastData, fetchUpcomingData } from './deliveriesActions';
import { getImageFromURL, IMAGES } from '@app/constants/images';
import { fetchOrderReceipt } from '@app/screens/checkout/receipt/receiptAction';
const MyDeliveries = (props: MyDeliveriesProps) => {
  const dispatch = useDispatch();
  const [isSelectUpcoming, setIsSelectUpcoming] = useState(true)
  const [isSelectPast, setIsSelectPast] = useState(false)

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      isSelectUpcoming && dispatch(fetchUpcomingData())
      isSelectPast && dispatch(fetchPastData())
    })
    return () => {
      unsubscribe;
    }

  }, [])

  const borderBottomSelected = () => {
    return (
      <View style={[styles.selectedContainer, {
        marginLeft: isSelectUpcoming === true ? 0 : vw(167),
        marginRight: isSelectUpcoming === true ? vw(167) : 0,
      }]}>
      </View>
    )
  }

  const renderUpcomingDeliveries = (item: any) => {
    return (
      <List item={item} onPress={() => {
        props.navigation.navigate(screens.receipt.receipt.name, { orderNumber: item.item.orderNumber })
        dispatch(fetchOrderReceipt(item.item.orderNumber, ""))
      }} />
    )
  }

  const handleOrderForOtherDays = () => {
    props.navigation.navigate(screens.menu.menu.name);
  }

  const emptyRender = () => {
    return (
      <View style={{ marginTop: vh(191), alignItems: "center" }}>
        <Image source={getImageFromURL(IMAGES.EMPTY_DELIVERIES)} style={{
          height: vh(96), width: vw(138),
        }} />
        {isSelectUpcoming && (props.fetchUpComingDeliveriesDataReducer.upcomingDeliveriesData?.length === 0 || props.fetchUpComingDeliveriesDataReducer.upcomingDeliveriesData === undefined) && <Text style={styles.emptyText}>{`${t('YouDontHaveOngoingOrders')}`}</Text>}
        {isSelectPast && !isSelectUpcoming && props.fetchPastDeliveriesDataReducer.pastDeliveriesData.length === 0 && <Text style={styles.emptyText}>{`${t('YouDontHaveAnyOrdersYet')}`}</Text>}
      </View>
    )
  }
  return (<>
    <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <PrimaryHeader
          iconSize={vw(22)}
          iconColor={colors.blackColor}
          left={"left"}
          title={t("MyDeliveries")}
          mainContainer={styles.headerMainContainer}
          titleStyle={styles.headerTitleStyle}
          leftPress={() => { props.navigation.goBack(); setIsSelectUpcoming(true) }}
        />
        <View style={styles.listContainer}>
          <TouchableOpacity onPress={() => {
            setIsSelectUpcoming(true);
            setIsSelectPast(false);
            dispatch(fetchUpcomingData())
          }}
            style={styles.upcomingbutton}
            activeOpacity={.8}>
            <Text style={[styles.tabTextContainer, {
              color: isSelectUpcoming ? colors.color_rgba_0_0_0_87 : colors.color_rgba_19_91_44_32
            }]}>{`${t('upComing')}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setIsSelectUpcoming(false);
            setIsSelectPast(true);
            dispatch(fetchPastData())
          }}
            activeOpacity={.8}
            style={styles.upcomingbutton}
          >
            <Text style={[styles.tabTextContainer, {
              color: isSelectPast ? colors.color_rgba_0_0_0_87 : colors.color_rgba_19_91_44_32
            }
            ]}>{`${t('past')}`}</Text>
          </TouchableOpacity>
        </View>
        {
          isSelectUpcoming && borderBottomSelected()
        }
        {
          isSelectPast && borderBottomSelected()
        }

        <View style={{ flex: 1 }}>
          {props.fetchUpComingDeliveriesDataReducer.isLoading !== true ?
            <FlatList
              data={isSelectUpcoming ? props.fetchUpComingDeliveriesDataReducer.upcomingDeliveriesData : props.fetchPastDeliveriesDataReducer.pastDeliveriesData}
              renderItem={renderUpcomingDeliveries}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={() => {
                return (
                  <View style={{ marginTop: Platform.OS === "android" ? vh(42) : vh(32) }}></View>
                )
              }}
              ListEmptyComponent={emptyRender}
              refreshing={false}
              onRefresh={() => {
                isSelectUpcoming && dispatch(fetchUpcomingData());
                isSelectPast && dispatch(fetchPastData())
              }}
            />
            :
            <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
              <ActivityIndicator size={"large"} />
            </View>
          }
        </View>
        {isSelectUpcoming && props.fetchUpComingDeliveriesDataReducer.isLoading !== true &&
          <View style={{ marginBottom: props.fetchUpComingDeliveriesDataReducer.upcomingDeliveriesData?.length === 0 || props.fetchUpComingDeliveriesDataReducer.upcomingDeliveriesData === undefined ? vh(160) : 0 }}>
            <PrimaryButton
              title={props.fetchUpComingDeliveriesDataReducer.upcomingDeliveriesData?.length === 0 || props.fetchUpComingDeliveriesDataReducer.upcomingDeliveriesData === undefined ? t("CheckTheMenuOfTheWeek") : t("orderForOtherDays")}
              onPress={() => { handleOrderForOtherDays() }}
              touchablestyle={[styles.buttonStyle, {
              }]}
              textstyle={styles.buttonTextStyle}
            />
          </View>
        }
        {props.fetchPastDeliveriesDataReducer.pastDeliveriesData.length === 0 && props.fetchUpComingDeliveriesDataReducer.isLoading !== true && !isSelectUpcoming &&
          <View style={{ marginBottom: vh(160) }}>
            <PrimaryButton
              title={t("CheckTheMenuOfTheWeek")}
              onPress={() => { handleOrderForOtherDays() }}
              touchablestyle={[styles.buttonStyle, {
              }]}
              textstyle={styles.buttonTextStyle}
            />
          </View>
        }
      </View>
    </SafeAreaView>
  </>
  )
}


function mapStateToProps(state: any) {
  const { fetchUpComingDeliveriesDataReducer,
    fetchPastDeliveriesDataReducer } = state
  return {
    fetchUpComingDeliveriesDataReducer,
    fetchPastDeliveriesDataReducer
  }
}

export default connect(
  mapStateToProps,
  null
)(MyDeliveries)


