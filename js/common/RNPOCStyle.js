// dependencies
import { StyleSheet } from "react-native";

// constants
import RNPOCSpacings from "./RNPOCSpacings";
import RNPOCColors from "./RNPOCColors";

const RNPOCStyles = StyleSheet.create({
    sectionTitleWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: RNPOCSpacings.verticalDistanceBig
    },
    sectionTitle: {
        fontSize: RNPOCSpacings.fontSizeBig,
        fontWeight: RNPOCSpacings.weightBold,
        color: RNPOCColors.white
    }
})

export default RNPOCStyles;