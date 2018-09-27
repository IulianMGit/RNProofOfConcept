// depedencies
import React, { Component } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";

// constants
import RNPOCStyles from "../common/RNPOCStyle";
import RNPOCSpacings from "../common/RNPOCSpacings";
import RNPOCStringConstants from "../common/RNPOCStringConstants";

// stores
import ColorThemeStore from "../ColorThemeStore";

// helpers
import themeInjector from "../helpers/Theme";

class SettingsSet extends Component {
  state = {
    colorThemeSwitchValue: ColorThemeStore.theme.color === "dark"
  };

  render() {
    const { theme } = this.props;

    return (
      <View style={styles.settingsWrapper}>
        <View style={RNPOCStyles.sectionTitleWrapper}>
          <Text
            style={[RNPOCStyles.sectionTitle, { color: theme.captionColor }]}
          >
            {RNPOCStringConstants.settings}
          </Text>
        </View>

        <View style={styles.optionWrapper}>
          <Text style={[styles.optionCaption, { color: theme.captionColor }]}>
            {RNPOCStringConstants.colorThemeSelectCaption}
          </Text>
          <Switch
            value={this.state.colorThemeSwitchValue}
            onValueChange={value => {
              ColorThemeStore.switch();
              this.setState({
                colorThemeSwitchValue: value
              });
            }}
          />
        </View>
      </View>
    );
  }
}

export default themeInjector(SettingsSet);

const styles = StyleSheet.create({
  settingsWrapper: {
    padding: RNPOCSpacings.verticalDistanceBig
  },
  optionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionCaption: {
    fontSize: RNPOCSpacings.fontSizeNormal
  }
});
