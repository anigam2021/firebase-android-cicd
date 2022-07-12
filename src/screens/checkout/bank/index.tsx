import React, { useEffect } from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, vw } from '@app/constants';
import { PrimaryHeader } from '@app/components';
import { styles } from '@app/screens/checkout/bank/styles';
import Separator from '@app/components/custom-seperator';
import { t } from 'i18next';
import { connect, useDispatch } from 'react-redux';
import { fetchBankData, setSelectedBank } from '@screen/contact/contactAction/checkoutAction';
import { ShowActivityIndicator } from '@app/components/activity-indicator';
import { PaymentProps } from '@app/utils/interface';

const Payment = (props: PaymentProps) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBankData())
    }, [])
    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <>
            <TouchableOpacity
                style={[styles.listContainer, {
                    backgroundColor: item.isSelected ? colors.color_DCE3D7 : colors.primary,
                }]}
                activeOpacity={0.8}
                onPress={() => {
                    dispatch(setSelectedBank(index))
                }}
            >
                < Text style={[styles.textWrapper]}> {item.name}</Text>
            </TouchableOpacity>
            <Separator separatorContainer={styles.separatorContainer} />
        </>
    );

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
            <SafeAreaView style={styles.container}>
                <View style={styles.addressContainer}>
                    <PrimaryHeader
                        iconSize={vw(22)}
                        iconColor={colors.blackColor}
                        left={"left"}
                        title={t('chooseBank')}
                        mainContainer={styles.headerMainContainer}
                        titleStyle={styles.headerTitleStyle}
                        leftPress={() => props.navigation.goBack()}
                    />
                </View>
                {
                    props.checkoutReducer.isLoading ?
                        <ShowActivityIndicator />
                        :
                        <View style={styles.flatListWrapper}>
                            <FlatList
                                data={props.checkoutReducer.bankList}
                                renderItem={renderItem}
                                keyExtractor={(item: any, index: number) => index.toString()}
                                refreshing={false}
                                onRefresh={() => {
                                    dispatch(fetchBankData())
                                }}
                            />
                        </View>
                }

            </SafeAreaView>

        </>
    )
}
function mapStateToProps(state: any) {
    const { checkoutReducer } = state
    return {
        checkoutReducer
    }
}

export default connect(
    mapStateToProps,
    null
)(Payment)