// dependencies
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Route } from "react-router-native";
import { graphql } from "react-apollo";

// queries
import GET_CATEGORIES from "./network/queries/getCategories";

// screens
import GenericSet from "./tabs/GenericSet";
import SettingsSet from "./tabs/SettingsSet";
import TabsNav from "./TabsNav";

// constants
import RNPOCColors from "./common/RNPOCColors";

class AppContainer extends Component {
  render() {
    const { data } = this.props;
    const { loading, postCategories } = data;

    if (loading) return <View style={styles.container} />;

    return (
      <View style={styles.container}>
        <View style={styles.tabsContent}>
          <Route path="/" exact component={SettingsSet} />
          <Route path="/tabNav/:id" component={GenericSet} />
          <Route path="/settings" component={SettingsSet} />
        </View>
        <TabsNav postCategories={postCategories} />
      </View>
    );
  }
}

export default graphql(GET_CATEGORIES)(AppContainer);
// TODO: see if we need switch

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  tabsContent: {
    height: "100%",
    flex: 1,
    backgroundColor: RNPOCColors.contentBackgroundColor
  }
});
