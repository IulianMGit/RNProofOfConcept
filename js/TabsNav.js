// dependencies
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link } from "react-router-native";
import themeInjector from "./helpers/Theme";

// constants
import RNPOCIcons from "./common/RNPOCIcons";

class TabsNav extends Component {
  render() {
    const { postCategories, theme } = this.props;

    return (
      <View style={styles.nav}>
        {postCategories.map(postCategory => (
          <Link
            key={postCategory._id}
            to={{
              pathname: `/tabNav/${postCategory._id}`,
              state: { name: postCategory.name }
            }}
            underlayColor={theme.tabUnderlayColor}
            style={[
              styles.navItem,
              { backgroundColor: theme.tabBackgroundColor }
            ]}
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
          underlayColor={theme.tabUnderlayColor}
          style={[
            styles.navItem,
            { backgroundColor: this.props.theme.tabBackgroundColor }
          ]}
        >
          {RNPOCIcons.settingsTabIcon}
        </Link>
      </View>
    );
  }
}

export default themeInjector(TabsNav);

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15
  }
});
