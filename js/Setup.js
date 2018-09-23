// dependencies
import React, { Component } from "react";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "react-apollo";

import CustomApolloClient from "./network/CustomApolloClient";

// screens
import AppContainer from "./AppContainer";

export default class Setup extends Component {
  render() {

    return (
      <ApolloProvider client={CustomApolloClient}>
        <NativeRouter>
          <AppContainer />
        </NativeRouter>
      </ApolloProvider>
    );
  }
}
