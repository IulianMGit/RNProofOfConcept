// constants
import RNPOCColors from "./RNPOCColors";

// helper
import IconProvider from "../helpers/IconProvider";

const namedIconsNicks = {
  javascript: IconProvider("js-square"),
  meteor: IconProvider("moon"),
  react: IconProvider("react"),
  other: IconProvider("gripfire"),
  settings: IconProvider("sliders-h")
};

export default {
  javascriptTabIcon: namedIconsNicks.javascript(22, RNPOCColors.tabColor),
  meteorTabIcon: namedIconsNicks.meteor(19, RNPOCColors.tabColor),
  reactTabIcon: namedIconsNicks.react(21, RNPOCColors.tabColor),
  otherTabIcon: namedIconsNicks.other(22, RNPOCColors.tabColor),
  settingsTabIcon: namedIconsNicks.settings(20, RNPOCColors.tabColor)
};
