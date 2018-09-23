// dependencies
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Route } from "react-router-native";
import { graphql } from "react-apollo";

// queries
import GET_CATEGORIES from "./network/queries/getCategories";

// screens
import JavaScriptSet from "./tabs/JavaScriptSet";
import SettingsSet from "./tabs/SettingsSet";
import TabsNav from "./TabsNav";

// constants
import RNPOCColors from "./common/RNPOCColors";
import routeToTabMapping from "./tabs/TabRoutes";

class AppContainer extends Component {
  render() {
    const { data } = this.props;
    const { loading, postCategories } = data;

    if (loading) return <View style={styles.container} />;

    const availablePostCategories = postCategories
      .map(postCategory => ({
        ...postCategory,
        name: postCategory.name.toLowerCase() // normalize  the fetched strings, EX.: 'JAvASript; string to be accepted
      }))
      .filter(postCategory => routeToTabMapping[postCategory.name]);

    return (
      <View style={styles.container}>
        <View style={styles.tabsContent}>
          {availablePostCategories.map(postCategory => (
            <Route
              key={postCategory.name}
              path={`/${postCategory.name}`}
              component={routeToTabMapping[postCategory.name]}
            />
          ))}

          <Route path="/" exact component={JavaScriptSet} />
          <Route path="/settings" component={SettingsSet} />
        </View>
        <TabsNav availablePostCategories={availablePostCategories} />
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
    padding: 15,
    backgroundColor: RNPOCColors.contentBackgroundColor
  }
});
