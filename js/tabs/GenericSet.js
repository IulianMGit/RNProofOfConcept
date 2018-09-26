// dependencies
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Keyboard
} from "react-native";
import { withApollo } from "react-apollo";

// queries
import GET_POSTS from "../network/queries/getPosts";

// constants
import RNPOCSpacings from "../common/RNPOCSpacings";
import RNPOCColors from "../common/RNPOCColors";
import RNPOCStyles from "../common/RNPOCStyle";

// components
import Post from "../components/Post";
import SearchTextInput from "../components/SearchTextInput";
import CreatePostSection from "../components/CreatePostSection";

class GenericSet extends Component {
  state = {
    query: "",

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
    this.setState({ isFetching: true, posts: [], query: "" });

    const { id } = nextProps.match.params;

    const { posts } = await this._fetchPosts(id);
    this.setState({ posts, isFetching: false });
  }

  // TODO: implement search server side: for now just filter the fetched posts, couldn't find way to query the graphQL server.
  _search = async query => {
    this.setState({ query });
    Keyboard.dismiss();
  };

  _refresh = async silently => {
    if (!silently) this.setState({ isRefreshing: true, posts: [] });

    const { id } = this.props.match.params;
    const { posts } = await this._fetchPosts(id);

    this.setState({ posts, isRefreshing: false });
  };

  // TODO: maybe add infinite scroll, basically downloading the whole db each time.
  _fetchPosts = async categoryId => {
    const { data } = await this.props.client.query({
      query: GET_POSTS,
      variables: {
        filters: { categoryId },
        options: { sort: { createdAt: -1 } }
      }
    });

    return data;
  };

  addPost = async post => {
    this.setState(prevState => ({ posts: [post, ...prevState.posts] }));
  };

  navigateToPostDetails = postId => {
    this.props.history.push(`/postDetails/${postId}`);
  };

  render() {
    const { name } = this.props.location.state;
    const { id: categoryId } = this.props.match.params;

    if (this.state.isFetching)
      return (
        <ActivityIndicator
          color={RNPOCColors.white}
          style={styles.activityIndicator}
        />
      );

    if (
      !this.state.posts.length &&
      !this.state.isRefreshing &&
      !this.state.isFetching
    )
      return <Text>No posts!!</Text>;

    const filteredPosts =
      this.state.query.length !== 0
        ? this.state.posts.filter(x => x.title.contains(this.state.query))
        : this.state.posts;

    return (
      <View>
        <FlatList
          data={filteredPosts}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.flatListContainer}
          ListHeaderComponent={() => (
            <View style={styles.flatListHeaderWrapper}>
              <View style={RNPOCStyles.sectionTitleWrapper}>
                <Text style={RNPOCStyles.sectionTitle}>{name}</Text>
              </View>

              <SearchTextInput
                throttledCallback={query => this._search(query)}
                value={this.state.query}
              />

              <CreatePostSection
                categoryId={categoryId}
                addPost={post => {
                  this.addPost(post);
                }}
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
            <Post
              post={item}
              onPress={() => {
                this.navigateToPostDetails(item._id);
              }}
            />
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
