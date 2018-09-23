// dependencies
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

// constants
import RNPOCColors from "../common/RNPOCColors";

export default name => (size = 20, color = RNPOCColors.white) => (
  <Icon name={name} size={size} color={color} />
);
