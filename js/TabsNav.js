// dependencies
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Link } from "react-router-native";

// constants
import RNPOCColors from "./common/RNPOCColors";
import RNPOCIcons from "./common/RNPOCIcons";

class TabsNav extends Component {
  render() {
    const { availablePostCategories } = this.props;

    return (
      <View style={styles.nav}>
        {availablePostCategories.map(postCategory => (
          <Link
            key={postCategory.name}
            to={`/${postCategory.name}`}
            underlayColor={RNPOCColors.tabUnderlayColor}
            style={styles.navItem}
          >
            {RNPOCIcons[`${postCategory.name}TabIcon`]}
          </Link>
        ))}

        <Link
          to="/settings"
          underlayColor={RNPOCColors.tabUnderlayColor}
          style={styles.navItem}
        >
          {RNPOCIcons.settingsTabIcon}
        </Link>
      </View>
    );
  }
}

export default TabsNav;
// TODO: see if we need switch

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: RNPOCColors.tabBackgroundColor
  }
});
