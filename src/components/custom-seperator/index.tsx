import { SeparatorProps } from '@app/utils/interface';
import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'

const Separator = (props: SeparatorProps) => {
    const { separatorContainer } = props;
    return (
        <View style={[styles.separatorContainer, separatorContainer]} />
    )
}
export default Separator;