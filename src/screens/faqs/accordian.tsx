import React from 'react';
import { View, TouchableOpacity, Image } from "react-native";
import { getImageFromURL, IMAGES } from '@app/constants/images';
import { vh, vw, } from "@app/constants";
import { RenderHTML } from 'react-native-render-html';
import { styles, answerStyle, title } from '@app/screens/faqs/style';

const Accordian = (props: any) => {
    return (
        <View >
            <View>
                <TouchableOpacity activeOpacity={0.8} style={styles.accordianContainer} onPress={props.onPress}>
                    <Image source={getImageFromURL(IMAGES.PLUS_ICON_FAQ)} style={styles.imageStyle} />
                    <RenderHTML
                        contentWidth={vw(335)}
                        source={{ html: `<p>${props.title}</p>` }}
                        tagsStyles={title}
                    />
                </TouchableOpacity>
                {
                    props.expanded &&
                    <View style={props.expanded ? [styles.child, {
                        marginTop: props.currentIndex === 0 && props.index === 0 ? -vh(40) : -vh(20),
                        marginBottom: props.currentIndex === 0 && props.index === 0 ? vh(-20) : -vh(0),
                    }] : null}>
                        <RenderHTML
                            contentWidth={vw(293)}
                            source={{ html: `<p>${props.data}</p>` }}
                            tagsStyles={answerStyle}
                        />
                    </View>
                }
                <View style={styles.parentHr} />
            </View>

        </View >
    )
}
export default Accordian;
