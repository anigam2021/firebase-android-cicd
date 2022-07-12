import { colors, fonts, vh, vw } from "@app/constants"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
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
  mainView: {
    backgroundColor: colors.color_FFFEF5,
    flex: 1
  },
  container: {
    flex: 1,
  },
  sectionNameText: {
    fontFamily: fonts.poppinsRegular,
    fontSize: vw(18),
    color: colors.color_000000,
    marginHorizontal: vw(24),
    marginTop: vh(40)
  },
  headingStyle: {
    marginLeft: vw(24),
    fontFamily: fonts.splineSans,
    fontSize: vw(18),
    color: colors.color_000000,
    marginTop: vh(20)
  },
  accordianContainer: {
    flexDirection: 'row',
    marginLeft: vw(24),
    alignItems: "center",
    marginVertical: vh(5)
  },
  parentHr: {
    height: 1,
    backgroundColor: colors.color_rgba_0_0_0_1,
    width: vw(350),
    alignSelf: "center",
  },
  child: {
    width: vw(293),
    alignSelf: "center",
  },
  imageStyle: {
    width: vw(12),
    height: vh(12),

  },
  headingView: {
    alignSelf: "center",
    fontFamily: fonts.splineSans,
    fontSize: vw(18),
    lineHeight: vh(21),
  },
})
export const contentViewTextStyle: any = {
  p: {
    marginLeft: vw(24),
    fontFamily: fonts.splineSans,
    fontSize: vw(18),
    color: colors.color_000000,
    marginTop: vh(20)
  }
}

export const title: any = {
  p: {
    fontSize: vw(14),
    fontFamily: fonts.poppinsRegular,
    color: colors.color_1B194B,
    marginLeft: vw(8),
  }
}
export const answerStyle: any = {
  p: {
    fontFamily: fonts.poppinsRegular,
    fontSize: vw(12),
    color: colors.color_rgba_0_0_0_7
  }
}