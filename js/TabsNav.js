// dependencies
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link } from "react-router-native";

// constants
import RNPOCColors from "./common/RNPOCColors";
import RNPOCIcons from "./common/RNPOCIcons";

class TabsNav extends Component {
  render() {
    const { postCategories } = this.props;

    return (
      <View style={styles.nav}>
        {postCategories.map(postCategory => (
          <Link
            key={postCategory._id}
            to={{
              pathname: `/tabNav/${postCategory._id}`,
              state: { name: postCategory.name }
            }}
            underlayColor={RNPOCColors.tabUnderlayColor}
            style={styles.navItem}
          >
            {RNPOCIcons[`${postCategory.name.toLowerCase()}TabIcon`] ? (
              RNPOCIcons[`${postCategory.name.toLowerCase()}TabIcon`]
            ) : (
              <Text>?</Text>
            )}
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
