// dependencies
import { StyleSheet } from "react-native";

// constants
import RNPOCSpacings from "./RNPOCSpacings";
import RNPOCColors from "./RNPOCColors";

const RNPOCStyles = StyleSheet.create({
  sectionTitleWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RNPOCSpacings.verticalDistanceBig
  },
  sectionTitle: {
    fontSize: RNPOCSpacings.fontSizeBig,
    fontWeight: RNPOCSpacings.weightBold,
    color: RNPOCColors.white
  },

  inputWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: RNPOCColors.white,
    borderRadius: 5,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    marginBottom: RNPOCSpacings.verticalDistanceNormal
  },
  input: {
    // height: 40,
    flex: 1,
    color: RNPOCColors.white,
    paddingHorizontal: RNPOCSpacings.verticalDistanceNormal
  },

  flatListContainer: {
    paddingHorizontal: RNPOCSpacings.verticalDistanceBig
  }
});

export default RNPOCStyles;
