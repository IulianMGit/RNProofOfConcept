// dependencies
import React, { Component } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { withApollo } from "react-apollo";

// queries
import GET_POST_DETAILS from "../network/queries/getPostDetails";

// constants
import RNPOCColors from "../common/RNPOCColors";

// components
import PostDetails from "./PostDetails";

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

  render() {
    if (this.state.isFetching)
      return (
        <ActivityIndicator
          color={RNPOCColors.white}
          style={styles.activityIndicator}
        />
      );

    return <PostDetails post={this.state.post} />;
  }
}

export default withApollo(PostDetailsWrapper);

const styles = StyleSheet.create({});
