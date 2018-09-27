import React, { Component } from "react";
// import { Component } from "react-native";
import PropTypes from "prop-types";

const themeWrap = ComponentToWrap =>
  class ThemeComponent extends Component {
    // define what’s needed from the `context`
    static contextTypes = {
      theme: PropTypes.object.isRequired
    };

    render() {
      const { theme } = this.context;
      // what we do is basically rendering `ComponentToWrap`
      // with an added `theme` prop, like a hook
      return <ComponentToWrap {...this.props} theme={theme} />;
    }
  };
export default themeWrap;
