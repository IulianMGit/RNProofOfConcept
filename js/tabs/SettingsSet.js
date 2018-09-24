import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

// constants
import RNPOCStyles from "../common/RNPOCStyle";
import RNPOCSpacings from "../common/RNPOCSpacings";

export default class SettingsSet extends Component {
  render() {
    return (
      <View style={styles.settingsWrapper}>
        <View style={RNPOCStyles.sectionTitleWrapper}>
          <Text style={RNPOCStyles.sectionTitle}>Settings</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingsWrapper: {
    padding: RNPOCSpacings.verticalDistanceBig
  }
});
