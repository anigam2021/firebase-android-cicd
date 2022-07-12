import { StyleSheet } from "react-native";
import { vw, vh } from "../../constants/dimension"


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    imageStyle: {
        marginTop: vh(25),
        width: vw(350),
        height: vh(300),
    },
    titleStyle: {
        fontSize: vw(32),
        color: '#000000',
        marginTop: vh(40),
        alignSelf: 'center',
    },
    contentStyle: {
        fontWeight: '400',
        fontSize: vw(17),
        color: '#000000',
        marginTop: vh(25),
        textAlign: 'center',
    },
    dotStyle: {
        height: vh(8),
        width: vw(8),
        backgroundColor: '#C4C4C4',
        borderRadius: 25,
        marginHorizontal: vw(5)
    },
    skipText: {
        fontWeight: '400',
        fontSize: vw(20),
        color: '#2EA8C9',
        //marginTop: vh(30),
        textAlign: 'center',
        bottom: vh(20)
    },
    buttonStyle: {
        width: vw(340),
        height: vh(54),
        borderRadius: 11,
        backgroundColor: '#2EA8C9',
        bottom: vh(35),
        alignSelf: 'center'
    },
    buttonText: {
        height: vh(54),
        fontWeight: '400',
        fontSize: vw(20),
        color: '#FFFFFF',
        textAlign: 'center',
        marginVertical: vh(14)
    },
    mainview: {
        height: vh(770),
    },
    button: {
        fontSize: vw(30)
    },
    buttonView: {
        flexDirection: "row",
        bottom: vh(80),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    renderItemView: {
        alignItems: 'center',
    },
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    touchableStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
    skipStyle: {
        alignSelf: "flex-end",
        fontSize: vw(15),
        margin: vw(20)
    }
})

export default styles;