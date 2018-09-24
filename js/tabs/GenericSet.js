// dependencies
import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { withApollo } from "react-apollo";

// queries
import GET_POSTS from "../network/queries/getPosts";

// constants
import RNPOCSpacings from "../common/RNPOCSpacings";
import RNPOCColors from "../common/RNPOCColors";
import RNPOCStyles from "../common/RNPOCStyle";

// components
import Post from "../components/post";

class GenericSet extends Component {
  state = {
    isFetching: true,
    posts: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this._fetchPosts(id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isFetching: true, posts: [] });

    const { id } = nextProps.match.params;
    this._fetchPosts(id);
  }

  _fetchPosts = async categoryId => {
    const { data } = await this.props.client.query({
      query: GET_POSTS,
      variables: { filters: { categoryId } }
    });
    // TODO: maybe add infinite scroll, basically downloading the whole db each time. 

    this.setState({ posts: data.posts, isFetching: false });
  };

  render() {
    const { name } = this.props.location.state;

    if (this.state.isFetching) return <ActivityIndicator color={RNPOCColors.white} style={styles.activityIndicator} />;

    if (!this.state.posts.length) return <Text>No posts!!</Text>;

    return (
      <View>
        <FlatList
          data={this.state.posts}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.flatListContainer}
          ListHeaderComponent={() => (
            <View style={RNPOCStyles.sectionTitleWrapper}>
              <Text style={RNPOCStyles.sectionTitle}>{name}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <Post post={item} />
          )}
        />
      </View>
    );
  }
}
// TODO: implement refresh.
export default withApollo(GenericSet);

const styles = StyleSheet.create({
  flatListContainer: {
    padding: RNPOCSpacings.verticalDistanceBig
  },
  activityIndicator: {
    marginVertical: RNPOCSpacings.verticalDistanceBig
  }
});
