import { colors } from '@app/constants';
import { FastImageProps } from '@app/utils/interface';
import React, { FC, useState } from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const CustomImage: FC<FastImageProps> = props => {
    const [loader, setLoader] = useState<boolean>(false)
    return (
        <>

            <FastImage
                style={[
                    props.style,
                    // { width: props.width, height: props.height }
                ]}
                source={props.source}
                resizeMode={props.resizeMode}
                onLoadStart={() => { setLoader(true) }}
                onError={() => { setLoader(false) }}
                onLoadEnd={() => { setLoader(false) }}
            />
            {/* </TouchableOpacity> */}
            {
                loader &&
                <View style={{
                    position: "absolute",
                    height: props.height,
                    width: props.width,
                }}>
                    <SkeletonPlaceholder speed={1000} backgroundColor={colors.skeletonLoader}>
                        <SkeletonPlaceholder.Item width={props.width} height={props.height} flexDirection="row" alignItems="center" />
                    </SkeletonPlaceholder>
                </View>
            }
        </>
    )
}


export default CustomImage

