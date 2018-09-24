// dependencies
import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Keyboard } from "react-native";
import { withApollo } from "react-apollo";

// queries
import GET_POSTS from "../network/queries/getPosts";

// constants
import RNPOCSpacings from "../common/RNPOCSpacings";
import RNPOCColors from "../common/RNPOCColors";
import RNPOCStyles from "../common/RNPOCStyle";

// components
import Post from "../components/post";
import SearchTextInput from "../components/SearchTextInput"

class GenericSet extends Component {
  state = {
    query: '',

    isFetching: true,
    isRefreshing: false,

    posts: []
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const { posts } = await this._fetchPosts(id);

    this.setState({ posts, isFetching: false });
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({ isFetching: true, posts: [], query: '' });

    const { id } = nextProps.match.params;

    const { posts } = await this._fetchPosts(id);
    this.setState({ posts, isFetching: false });
  }

  _search = async (query) => {
    this.setState({ query });

    this._refresh(true);
  }

  _refresh = async (silently) => {
    if (!silently)
      this.setState({ isRefreshing: true, posts: [] });

    const { id } = this.props.match.params;
    const { posts } = await this._fetchPosts(id);

    this.setState({ posts, isRefreshing: false });
  }

  _fetchPosts = async categoryId => {
    const { data } = await this.props.client.query({
      query: GET_POSTS,
      variables: { filters: { categoryId } }
    });
    // TODO: maybe add infinite scroll, basically downloading the whole db each time. 

    return data;
  };

  render() {
    const { name } = this.props.location.state;

    if (this.state.isFetching) return <ActivityIndicator color={RNPOCColors.white} style={styles.activityIndicator} />;

    if (!this.state.posts.length && !this.state.isRefreshing && !this.state.isFetching) return <Text>No posts!!</Text>;

    return (
      <View>
        <FlatList
          data={this.state.posts}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.flatListContainer}
          ListHeaderComponent={() => (
            <View style={styles.flatListHeaderWrapper}>
              <View style={RNPOCStyles.sectionTitleWrapper}>
                <Text style={RNPOCStyles.sectionTitle}>{name}</Text>
              </View>

              <SearchTextInput
                throttledCallback={(query) => this._search(query)}
                value={this.state.query}
              />
            </View>
          )}

          refreshControl={(
            <RefreshControl
              colors={[RNPOCColors.white]}
              progressBackgroundColor={RNPOCColors.black}
              tintColor={RNPOCColors.white}
              refreshing={this.state.isRefreshing}
              onRefresh={this._refresh}
            />
          )}
          renderItem={({ item }) => (
            <Post post={item} />
          )}
        />
      </View>
    );
  }
}

export default withApollo(GenericSet);

const styles = StyleSheet.create({
  flatListHeaderWrapper: {
    paddingVertical: RNPOCSpacings.verticalDistanceBig
  },
  flatListContainer: {
    paddingHorizontal: RNPOCSpacings.verticalDistanceBig
  },
  activityIndicator: {
    marginVertical: RNPOCSpacings.verticalDistanceBig
  }
});
