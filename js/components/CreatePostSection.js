// dependencies
import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { withApollo } from "react-apollo";

// queries
import GET_USERS from "../network/queries/getUsers";
import GET_TAGS from "../network/queries/getTags";

// mutations
import POST_IN_CATEGORY from "../network/mutations/createPost";

// constants
import RNPOCColors from "../common/RNPOCColors";
import RNPOCStringConstants from "../common/RNPOCStringConstants";
import RNPOCStyles from "../common/RNPOCStyle";
import RNPOCSpacings from "../common/RNPOCSpacings";

// helpers
import themeInjector from "../helpers/Theme";

class CreatePostSection extends Component {
  state = {
    newPostTitle: "",
    newPostContent: ""
  };

  _getUserId = async () => {
    const { data } = await this.props.client.query({
      query: GET_USERS,
      variables: { options: { limit: 1 } } // just getting the first user the api returns, required by the post.
    });
    if (data.users && data.users.length) return data.users[0]._id;

    return undefined;
  };

  _getTagIds = async () => {
    const { data } = await this.props.client.query({
      query: GET_TAGS,
      variables: { options: { limit: 2 } } // just getting some tags as we don t offer the user a posibility to choose.
    });

    return data.tags.map(x => x._id);
  };

  submitNewPost = async () => {
    const userId = await this._getUserId();
    const tagIds = await this._getTagIds();
    // TODO: maybe get these 2 at the start of the app and just use them here, for now we don't have a logic so just do as it is.

    const { data } = await this.props.client.mutate({
      mutation: POST_IN_CATEGORY,
      variables: {
        input: {
          title: this.state.newPostTitle,
          description: this.state.newPostContent,
          categoryId: this.props.categoryId,
          userId,
          tagIds
        }
      }
    });

    this.setState({ newPostTitle: "", newPostContent: "" });

    setTimeout(() => {
      this.props.addPost(data.addPost);
    });
  };

  render() {
    const { theme } = this.props;

    const isNewPostCommitValid =
      this.state.newPostTitle &&
      this.state.newPostTitle.length !== 0 &&
      this.state.newPostContent &&
      this.state.newPostContent.length !== 0;
    return (
      <View>
        <View style={styles.captionWrapper}>
          <Text style={[styles.caption, { color: theme.captionColor }]}>
            {RNPOCStringConstants.createANewMessageCaption}
          </Text>
        </View>

        <View style={RNPOCStyles.inputWrapper}>
          <TextInput
            onChangeText={text => {
              this.setState({ newPostTitle: text });
            }}
            value={this.state.newPostTitle}
            multiline
            placeholder={RNPOCStringConstants.createPostTitlePlaceholder}
            placeholderTextColor={theme.inputPlaceholderColor}
            style={RNPOCStyles.input}
          />
        </View>

        <View style={RNPOCStyles.inputWrapper}>
          <TextInput
            onChangeText={text => {
              this.setState({ newPostContent: text });
            }}
            value={this.state.newPostContent}
            multiline
            placeholder={RNPOCStringConstants.createPostContentPlaceholder}
            placeholderTextColor={theme.inputPlaceholderColor}
            style={RNPOCStyles.input}
          />
        </View>

        <View style={styles.submitButtonWrapper}>
          <TouchableOpacity
            disabled={!isNewPostCommitValid}
            style={styles.submitButton}
            onPress={() => {
              this.submitNewPost();
            }}
          >
            <Text
              style={
                isNewPostCommitValid
                  ? styles.submitButtonTextValid
                  : styles.submitButtonTextInvalid
              }
            >
              {RNPOCStringConstants.submitNewPostButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default themeInjector(withApollo(CreatePostSection));

const styles = StyleSheet.create({
  captionWrapper: { marginBottom: RNPOCSpacings.verticalDistanceNormal },

  caption: {
    fontSize: RNPOCSpacings.fontSizeNormal,
    fontWeight: RNPOCSpacings.weightBold
  },

  submitButtonWrapper: {
    alignItems: "center"
  },

  submitButton: {
    borderWidth: 1,
    borderColor: RNPOCColors.lightGray,
    fontWeight: RNPOCSpacings.weightBold,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: RNPOCSpacings.verticalDistanceSmall,
    borderRadius: 5
  },

  submitButtonTextValid: {
    color: RNPOCColors.lightGray
  },

  submitButtonTextInvalid: {
    color: RNPOCColors.darkGray
  }
});
