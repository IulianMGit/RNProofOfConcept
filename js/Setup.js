// dependencies
import React from "react";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "react-apollo";
import { Provider } from "mobx-react";

// helpers
import CustomApolloClient from "./network/CustomApolloClient";
import stores from "./helpers/StoresProvider";

// screens
import ThemeSetup from "./ThemeSetup";

const Setup = () => (
  <Provider {...stores}>
    <ApolloProvider client={CustomApolloClient}>
      <NativeRouter>
        <ThemeSetup />
      </NativeRouter>
    </ApolloProvider>
  </Provider>
);

export default Setup;
