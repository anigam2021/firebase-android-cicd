import React from "react";
import { View, ActivityIndicator } from "react-native";
import { colors } from "@app/constants";
import utils from '@app/utils';
import { ActivityIndicatorProps } from "@app/utils/interface";
ShowActivityIndicator.defaultProps = {
    inidicatorColor: colors.color_135B2C,
    sizeIndicator: "large"
}
export function ShowActivityIndicator(props: ActivityIndicatorProps) {
    return (
        <View style={[utils.commonStyles.actIndMainView, props.mainViewWrapper]}>
            <ActivityIndicator color={props.inidicatorColor} size={props.sizeIndicator} />
        </View>)
}
