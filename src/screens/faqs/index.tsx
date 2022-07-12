import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, FlatList, Text } from 'react-native'
import {
  PrimaryHeader
} from "@app/components";
import { vw, colors, } from "@app/constants";
import { t } from 'i18next';
import Accordian from './accordian';
import { connect, useDispatch } from 'react-redux';
import { fetchFaqListData } from './faqAction/faqAction';
import { styles } from './style';
import types from "@screen/faqs/faqAction/types";
import { ShowActivityIndicator } from '@app/components/activity-indicator';
const Faq = (props: any) => {
  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    dispatch({
      type: types.FAQ_LOADER,
      isLoading: true
    })
    dispatch(fetchFaqListData())
  }, []
  )
  const [selectedName, setselectedName] = useState<string>("")
  const [selectedQuestion, setselectedQuestion] = useState<any>(null)
  const renderItem = (currentItem: any) => {
    return (
      <View>
        <Text style={styles.sectionNameText}>{currentItem.item.name}</Text>
        <FlatList
          data={currentItem.item.questions}
          renderItem={(item: any) => renderQuestions(item, currentItem)}
        />
      </View>
    )
  }
  const renderQuestions = ({ item, index }: any, currentItem: any) => {
    return (
      <Accordian
        title={item.question}
        currentIndex={currentItem.index}
        index={index}
        data={item.answer}
        questions={item.questions}
        expanded={selectedName === currentItem.item.name && selectedQuestion === index ? true : false}
        onPress={() => {
          ((currentItem.item.questions.length - 1) === index) && (currentItem.index === (props.faqReducer.faqList.sections.length - 1)) &&
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 100)
          if (selectedName === currentItem.item.name && selectedQuestion === index) {
            setselectedName("")
            setselectedQuestion(null)
          } else {
            setselectedName(currentItem.item.name)
            setselectedQuestion(index)
          }
        }}
      />)
  }
  return (
    <SafeAreaView style={styles.mainView}>
      <PrimaryHeader
        iconSize={vw(22)}
        iconColor={colors.blackColor}
        left={"left"}
        title={t("FAQ")}
        mainContainer={styles.headerMainContainer}
        titleStyle={styles.headerTitleStyle}
        leftPress={() => {
          props.navigation.goBack()
          setselectedName("")
          setselectedQuestion("")
        }
        }
      />
      {
        props.faqReducer.isLoading ?
          <ShowActivityIndicator />
          :
          <View style={{ flex: 1 }}>
            <FlatList
              data={props.faqReducer.faqList.sections}
              renderItem={renderItem}
              ref={flatListRef}
            />
          </View>
      }

    </SafeAreaView>
  )
}
function mapStateToProps(state: any) {
  const { faqReducer } = state
  return {
    faqReducer
  }
}
export default connect(
  mapStateToProps,
  null
)(Faq)


