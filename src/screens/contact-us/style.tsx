import { colors, fonts, vh, vw } from "@app/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color_FFFEF5,
    flex: 1
  },
  headerMainContainer: {
    paddingHorizontal: vw(20),
    marginTop: vh(30)
  },
  headerTitleStyle: {
    fontSize: vw(18),
    lineHeight: vw(20),
    fontFamily: fonts.poppinsMedium,
    color: colors.color_071731
  },

  mainHeadingText: {
    fontSize: vw(30),
    lineHeight: vh(40),
    fontFamily: fonts.poppinsRegular,
    color: colors.color_000000,
    marginTop: vh(41),
    paddingHorizontal: vw(20)
  },

  subTextStyle: {
    marginTop: vh(8),
    lineHeight: vh(25),
    fontFamily: fonts.poppinsRegular,
    fontSize: vw(14),
    color: colors.color_rgba_0_0_0_7,
    paddingHorizontal: vw(20)
  },
  buttonMainView: {
    alignSelf: "center",
    marginTop: vh(43),
    flexDirection: "row",
  },
  mailButtonView: {
    backgroundColor: colors.color_rgba_220_227_215_3,
    width: vw(90),
    height: vh(77),
    borderRadius: vw(12),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: vw(8)
  },
  modalBackGroundContainer: {
    backgroundColor: colors.color_rgba_0_0_0_4,
    flex: 1,
    top: vh(0),
    bottom: vh(0),
    left: vw(0),
    right: vw(0),
    opacity: .6,
    position: "absolute"
  },
  modalContainer: {
    position: "absolute",
    top: vh(368),
    marginHorizontal: vw(52),
    borderRadius: vw(14),
    backgroundColor: colors.whiteColor
  },
  textContainer: {
    margin: vh(16),
    alignItems: "center",
    width: vw(238),
  },
  messageText: {
    fontSize: vw(17),
    color: colors.color_000000,
    fontWeight: '600',
    lineHeight: vw(22),
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 2,
  },
  buttonSubContainer: {
    alignItems: "center",
    flex: 1
  },
  cancelText: {
    color: "#007AFF",
    fontSize: vw(17),
    fontWeight: "400",
    lineHeight: vw(22),
    marginVertical: vh(10)
  },
  openText: {
    color: "#007AFF",
    fontSize: vw(17),
    fontWeight: "600",
    lineHeight: vw(22),
    alignItems: "center",
    marginVertical: vh(10)
  }
})
