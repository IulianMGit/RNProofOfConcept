// depedencies
import React from "react";
import PropTypes from "prop-types";

// themes
import DarkTheme from "./Themes/Dark";
import LightTheme from "./Themes/Light";

class ThemeProvider extends React.Component {
  getChildContext() {
    return { theme: this.props.theme === "dark" ? DarkTheme : LightTheme };
  }

  render() {
    return this.props.children;
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.object.isRequired
};

export default ThemeProvider;
