// depedencies
import React, { Component } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { observer, inject } from "mobx-react";

// constants
import RNPOCStyles from "../common/RNPOCStyle";
import RNPOCSpacings from "../common/RNPOCSpacings";
import RNPOCStringConstants from "../common/RNPOCStringConstants";

// helpers
import themeInjector from "../helpers/Theme";

@inject("colorThemeStore")
@observer
class SettingsSet extends Component {
  state = {
    colorThemeSwitchValue: this.props.colorThemeStore.theme === "dark"
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
              this.props.colorThemeStore.switch();
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
