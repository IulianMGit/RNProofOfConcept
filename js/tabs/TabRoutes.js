// screens
import JavaScriptSet from "./JavaScriptSet";
import MeteorSet from "./MeteorSet";
import ReactSet from "./ReactSet";
import OtherSet from "./OtherSet";
import SettingsSet from "./SettingsSet";

const routeToTabMapping = {
  javascript: JavaScriptSet,
  meteor: MeteorSet,
  react: ReactSet,
  other: OtherSet,
  settings: SettingsSet
};

export default routeToTabMapping;
