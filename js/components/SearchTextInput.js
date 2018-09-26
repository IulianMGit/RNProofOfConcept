// dependencies
import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { debounce } from "throttle-debounce";

// constants
// import RNPOCSpacings from "../common/RNPOCSpacings";
import RNPOCColors from "../common/RNPOCColors";
import RNPOCSpacings from "../common/RNPOCSpacings";
import RNPOCStringConstants from "../common/RNPOCStringConstants";
import RNPOCConstantProps from "../common/RNPOCConstantProps";
import RNPOCStyles from "../common/RNPOCStyle";

const _debounceTimeout = 500;

class SearchTextInput extends Component {
  state = {
    query: this.props.value || ""
  };

  _onSearchInput = debounce(_debounceTimeout, () => {
    this.props.throttledCallback(this.state.query);
  });

  resetInput = () => {
    this.input.clear();
    this.props.throttledCallback("");
  };

  focusInput = () => {
    this.input.focus();
  };

  render() {
    return (
      <View style={RNPOCStyles.inputWrapper}>
        <TextInput
          onChangeText={text => {
            this.setState({ query: text });
            this._onSearchInput();
          }}
          value={this.state.query}
          style={RNPOCStyles.input}
          placeholder={RNPOCStringConstants.searchPostsPlaceholder}
          placeholderTextColor={RNPOCColors.inputPlaceholderColor}
          ref={inputRef => {
            this.input = inputRef;
          }}
        />
        {Boolean(this.state.query) &&
          this.state.query.length !== 0 && (
            <TouchableOpacity
              onPress={() => {
                this.resetInput();
              }}
              hitSlop={RNPOCConstantProps.normalHitSlop}
              style={styles.resetInputButton}
            >
              <Text style={styles.xButtonImitation}>+</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}
// TODO: implement refresh.
export default SearchTextInput;

const styles = StyleSheet.create({
  xButtonImitation: {
    color: RNPOCColors.white,
    transform: [{ rotate: "45deg" }],
    fontSize: RNPOCSpacings.fontSizeBig,
    position: "absolute"
  },
  resetInputButton: {
    padding: RNPOCSpacings.horizontalDistanceBig,
    justifyContent: "center",
    alignItems: "center"
  }
});
