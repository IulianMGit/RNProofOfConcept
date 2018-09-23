// dependencies
import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { withApollo } from "react-apollo";

// queries
import GET_POSTS from "../network/queries/getPosts";

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

    if (this.state.isFetching) return <Text>Fetching!</Text>;

    if (!this.state.posts.length) return <Text>No posts!!</Text>;

    return (
      <View>
        <Text>{name}</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>

              <Text>{item.description}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default withApollo(GenericSet);

// const styles = StyleSheet.create({});
