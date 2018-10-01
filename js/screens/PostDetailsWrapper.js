// dependencies
import React, { Component } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView
} from "react-native";
import { withApollo } from "react-apollo";

// queries
import GET_POST_DETAILS from "../network/queries/getPostDetails";

// constants
import RNPOCColors from "../common/RNPOCColors";

// components
import PostDetails from "./PostDetails";
import CreateCommentSection from "../components/CreateCommentSection";

class PostDetailsWrapper extends Component {
  state = {
    post: null,
    isFetching: true
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const post = await this._fetchPost(id);

    if (post) this.setState({ post, isFetching: false });
  }

  _fetchPost = async id => {
    const { data } = await this.props.client.query({
      query: GET_POST_DETAILS,
      variables: {
        filters: { _id: id },
        options: { limit: 1 }
      }
    });

    if (data.posts && data.posts.length) return data.posts[0];

    return null;
  };

  addCommentToPost = newComment => {
    this.state.post.comments = [
      ...(this.state.post.comments ? this.state.post.comments : []),
      newComment
    ];

    this.setState({});
    // TODO: better way to update nested state objects?

    setTimeout(() => {
      this.scrollView.scrollToEnd({animated: true});
    });
  };

  render() {
    if (this.state.isFetching)
      return (
        <ActivityIndicator
          color={RNPOCColors.white}
        />
      );

    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={StatusBar.currentHeight}
      >
        <ScrollView
          ref={scrollViewRef => {
            this.scrollView = scrollViewRef;
          }}
        >
          <PostDetails post={this.state.post} />
          <CreateCommentSection
            post={this.state.post}
            onAddComment={newComment => this.addCommentToPost(newComment)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default withApollo(PostDetailsWrapper);

