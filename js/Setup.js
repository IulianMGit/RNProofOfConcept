// dependencies
import React, { Component } from "react";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "react-apollo";
import CustomApolloClient from "./network/CustomApolloClient";

import ThemeProvider from "./common/ThemeProvider";
import ColorThemeStore from "./ColorThemeStore";

// screens
import AppContainer from "./AppContainer";

class Setup extends Component {
  render() {
    return (
      <ApolloProvider client={CustomApolloClient}>
        <NativeRouter>
          <ThemeProvider theme={ColorThemeStore.theme.color}>
            <AppContainer />
          </ThemeProvider>
        </NativeRouter>
      </ApolloProvider>
    );
  }
}

export default Setup;
