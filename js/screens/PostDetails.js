// dependencies
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList
  //   StyleSheet,
  //   ActivityIndicator,
  //   RefreshControl,
  //   Keyboard
} from "react-native";
import { withApollo } from "react-apollo";

// queries
// import GET_POSTS from "../network/queries/getPosts";

// constants
// import RNPOCSpacings from "../common/RNPOCSpacings";
import RNPOCColors from "../common/RNPOCColors";
// import RNPOCStyles from "../common/RNPOCStyle";

// // components
// import Post from "../components/Post";
// import SearchTextInput from "../components/SearchTextInput";
// import CreatePostSection from "../components/CreatePostSection";
import Comment from "../components/Comment";

class PostDetails extends Component {
  state = {};

  render() {
    const { post } = this.props;

    return (
      <View>
        <View>
          <Text style={{ color: RNPOCColors.white }}>
            {`${post.user.firstname} ${post.user.lastname}`}
          </Text>

          <Text style={{ color: RNPOCColors.white }}>{post.title}</Text>

          <Text style={{ color: RNPOCColors.white }}>{post.description}</Text>

          <Text style={{ color: RNPOCColors.white }}>{post.createdAt}</Text>

          <Text style={{ color: RNPOCColors.white }}>{post.category.name}</Text>

          <Text style={{ color: RNPOCColors.white }}>
            {post.tags.map(tag => tag.name).join(", ")}
          </Text>
        </View>

        {post.comments &&
          post.comments.length !== 0 && (
            <View>
              <FlatList
                data={post.comments}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <Comment comment={item} />}
              />
            </View>
          )}
      </View>
    );
  }
}

export default withApollo(PostDetails);

// const styles = StyleSheet.create({});
