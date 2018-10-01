// dependencies
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";
import { withApollo } from "react-apollo";

// constants
import RNPOCStyles from "../common/RNPOCStyle";
import RNPOCSpacings from "../common/RNPOCSpacings";

// // components
import Comment from "../components/Comment";

// helpers
import themeInjector from "../helpers/Theme";

class PostDetails extends Component {
  render() {
    const { post, theme } = this.props;

    return (
      <View>
        <View>
          <FlatList
            contentContainerStyle={RNPOCStyles.flatListContainer}
            ListHeaderComponent={(
              <View style={styles.container}>
                <Text
                  style={[styles.userNameStyle, { color: theme.captionColor }]}
                >
                  {`${post.user.firstname} ${post.user.lastname}`}
                </Text>

                <Text
                  style={[styles.titleStyle, { color: theme.captionColor }]}
                >
                  {post.title}
                </Text>

                <Text style={[{ color: theme.captionColor }]}>
                  {post.description}
                </Text>

                <Text style={[{ color: theme.captionColor }]}>
                  {post.createdAt}
                </Text>

                <Text style={[{ color: theme.captionColor }]}>
                  {post.category.name}
                </Text>

                <Text style={[{ color: theme.captionColor }]}>
                  {post.tags.map(tag => tag.name).join(", ")}
                </Text>
              </View>
)}
            data={post.comments || []}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <Comment comment={item} />}
          />
        </View>
      </View>
    );
  }
}

export default withApollo(themeInjector(PostDetails));

const styles = StyleSheet.create({
  container: {
    padding: RNPOCSpacings.verticalDistanceSmall
  },
  userNameStyle: {
    fontSize: RNPOCSpacings.fontSizeBig,
    marginBottom: RNPOCSpacings.verticalDistanceBig
  },
  titleStyle: {
    fontSize: RNPOCSpacings.fontSizeNormal,
    marginBottom: RNPOCSpacings.verticalDistanceSmall
  }
});
