// dependencies
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { withApollo } from "react-apollo";

// queries
import GET_USERS from "../network/queries/getUsers";

// mutations
import ADD_COMMENT from "../network/mutations/addComment";

// constants
import RNPOCColors from "../common/RNPOCColors";
import RNPOCStringConstants from "../common/RNPOCStringConstants";
import RNPOCSpacings from "../common/RNPOCSpacings";
import RNPOCConstantProps from "../common/RNPOCConstantProps";

class CreateCommentSection extends Component {
  initialState = {
    newCommentText: ""
  };

  state = this.initialState;

  // TODO: refactor when implementing mobx/redux.
  _getUser = async () => {
    const { data } = await this.props.client.query({
      query: GET_USERS,
      variables: { options: { limit: 1 } } // just getting the first user the api returns, required by the comment.
    });
    if (data.users && data.users.length) return data.users[0];

    return undefined;
  };

  postNewComment = async () => {
    const user = await this._getUser();

    const { data } = await this.props.client.mutate({
      mutation: ADD_COMMENT,
      variables: {
        input: {
          text: this.state.newCommentText,
          postId: this.props.post._id,
          userId: user._id
        }
      }
    });

    this.setState(this.initialState);
    Keyboard.dismiss();

    data.addComment.user = user; // I can t take it from mutation for some reason.

    setTimeout(() => {
      this.props.onAddComment(data.addComment);
    });
  };

  render() {
    return (
      <View style={styles.addCommentWrapper}>
        <TextInput
          onChangeText={text => {
            this.setState({ newCommentText: text });
          }}
          value={this.state.newCommentText}
          style={styles.addComentInput}
          placeholder={RNPOCStringConstants.addCommentPlaceholder}
          placeholderTextColor={RNPOCColors.darkGray2}
        />

        <TouchableOpacity
          hitSlop={RNPOCConstantProps.normalHitSlop}
          onPress={() => {
            this.postNewComment();
          }}
          style={styles.commitButton}
        >
          <Text>{RNPOCStringConstants.OK}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withApollo(CreateCommentSection);

const styles = StyleSheet.create({
  commitButton: {
    backgroundColor: RNPOCColors.lightBlue,
    padding: RNPOCSpacings.horizontalDistanceSmall,
    justifyContent: "center",
    alignContent: "center"
  },
  addCommentWrapper: {
    backgroundColor: RNPOCColors.white,
    width: "100%",
    borderWidth: 1,
    borderColor: RNPOCColors.black,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  addComentInput: {
    flex: 1,
    color: RNPOCColors.black,
    padding: RNPOCSpacings.verticalDistanceNormal,
    fontSize: RNPOCSpacings.fontSizeNormal
  }
});
