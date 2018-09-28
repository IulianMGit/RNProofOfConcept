// dependencies
import React, { Component } from "react";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "react-apollo";
import { Provider } from "mobx-react";

// helpers
import CustomApolloClient from "./network/CustomApolloClient";
import stores from "./helpers/StoresProvider";

// screens
import ThemeSetup from "./ThemeSetup";

class Setup extends Component {
  render = () => (
    <Provider {...stores}>
      <ApolloProvider client={CustomApolloClient}>
        <NativeRouter>
          <ThemeSetup />
        </NativeRouter>
      </ApolloProvider>
    </Provider>
  );
}

export default Setup;
