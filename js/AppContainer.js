// dependencies
import React, { Component } from "react";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import { Route, withRouter } from "react-router-native";
import { graphql } from "react-apollo";
// import { observer, inject } from "mobx-react";
// import { Provider as MobXProvider } from "mobx-react/native";

// queries
import GET_CATEGORIES from "./network/queries/getCategories";

// screens
import GenericSet from "./tabs/GenericSet";
import SettingsSet from "./tabs/SettingsSet";
import TabsNav from "./TabsNav";
import PostDetailsWrapper from "./screens/PostDetailsWrapper";

// helpers
import themeInjector from "./helpers/Theme";

const { height: vh } = Dimensions.get("window");

class AppContainer extends Component {
  render() {
    const { data, theme } = this.props;
    const { loading, postCategories } = data;

    if (loading) return <View style={styles.container} />;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.contentBackgroundColor }
        ]}
      >
        <View style={styles.tabsContent}>
          <Route path="/" exact component={SettingsSet} />
          <Route path="/tabNav/:id" component={GenericSet} />
          <Route path="/postDetails/:id" component={PostDetailsWrapper} />
          <Route path="/settings" component={SettingsSet} />
        </View>
        <TabsNav postCategories={postCategories} />
      </View>
    );
  }
}

export default themeInjector(graphql(GET_CATEGORIES)(withRouter(AppContainer)));

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: vh - StatusBar.currentHeight
  },
  tabsContent: {
    height: "100%",
    flex: 1
  }
});
