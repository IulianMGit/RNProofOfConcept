// dependencies
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-native";

// screens
import AppContainer from "./AppContainer";

// helpers
import ThemeProvider from "./common/ThemeProvider";

@inject("colorThemeStore")
@observer
export default withRouter(class ThemeSetup extends Component {
// withRouter is required by the fact that mobx overrides shouldComponentUpdate and the component is not updated so the location can change.

  render() {
    return (
      <ThemeProvider theme={this.props.colorThemeStore.theme}>
        <AppContainer />
      </ThemeProvider>
    );
  }
})
