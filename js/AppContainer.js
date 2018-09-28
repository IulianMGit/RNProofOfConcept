// dependencies
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  BackHandler
} from "react-native";
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
import {
  storeItem,
  retrieveItem,
  registeredKeys
} from "./helpers/CacheProvider";

const { height: vh } = Dimensions.get("window");

class AppContainer extends Component {
  backHandler = null;

  async componentWillMount() {
    const cachedState = await retrieveItem(registeredKeys.lastVisitedSection);

    if (cachedState) {
      this.props.history.replace(cachedState);
    }
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(location =>
      this.handleGlobalHistoryChange(location)
    );

    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      this.handleGlobalAndroidBack()
    );
  }

  componentWillUnmount() {
    this.unlisten();
    this.backHandler.remove();
  }

  handleGlobalAndroidBack = () => {
    const { history } = this.props;

    if (history.length > 1) {
      history.goBack();
      return true;
    }

    return false;
  };
  // TODO: further inspect if this works properly.

  handleGlobalHistoryChange = async location => {
    const { pathname, state } = location;

    await storeItem(registeredKeys.lastVisitedSection, { pathname, state });
  };

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
