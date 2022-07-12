import React from 'react'
import { TextInput, Text, View } from 'react-native';

import { colors, fonts, vh, vw } from '@app/constants';
import { styles } from './styles';
import { InputProps } from '@app/utils/interface';



const PrimaryInput = React.forwardRef<TextInput, React.PropsWithChildren<InputProps>>((props, ref) => {

    return (
        <View>
            {
                props.showTitleText === true ? (props.showTitle &&
                    <Text style={[styles.titleText, props.titleText]}>{props.title}</Text>) : null
            }
            <TextInput
                ref={ref}
                value={props.value}
                style={[styles.inputStyle, props.textInputStyle, {
                    paddingHorizontal: props.showTitleText === true ? 0 : vw(20),
                }]}
                placeholder={props.showTitle ? "" : props.placeholder}
                secureTextEntry={props.secureTextEntry}
                onChangeText={props.onChangeText}
                onSubmitEditing={props.onSubmitEditing}
                blurOnSubmit={props.blurOnSubmit}
                keyboardType={props.keyboardType}
                placeholderTextColor={props.placeholderTextColor || colors.color_333333}
                editable={props.editable}
                maxLength={props.maxLength}
                multiline={props.multiline || false}
                autoCapitalize={props.autoCapitalize}
                onFocus={props.onFocus}
                autoCorrect={props.autoCorrect}
                allowFontScaling={props.allowFontScaling}
                caretHidden={props.caretHidden}
                numberOfLines={props.numberOfLines}
                onBlur={props.onBlur}
                onScroll={props.onScroll}
                scrollEnabled={props.scrollEnabled}
                textAlign={props.textAlign}
                underlineColorAndroid={props.underlineColorAndroid}
                textBreakStrategy={props.textBreakStrategy}
                showSoftInputOnFocus={props.showSoftInputOnFocus}
                selectTextOnFocus={props.selectTextOnFocus}
                selectionColor={props.selectionColor}
                rejectResponderTermination={props.rejectResponderTermination}
                returnKeyType={props.returnKeyType}
                onLayout={props.onLayout}
                returnKeyLabel={props.returnKeyLabel}
                {...props}
            />
            {props.isError && <Text style={{
                color: colors.color_F16C6C,
                alignSelf: "flex-start",
                marginTop: vh(8),
                fontFamily: fonts.poppinsSemiBold,
                fontSize: vw(14),
                lineHeight: vw(18)
            }}>{props.errorMsg}</Text>}
        </View>
    )
})
export default PrimaryInput;