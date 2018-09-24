// dependencies
import React from "react";
import { StyleSheet, View, Text } from "react-native";

// constants
import RNPOCColors from "../common/RNPOCColors";
import RNPOCSpacings from "../common/RNPOCSpacings";

const Post = ({ post }) => (
  <View style={styles.postWrapper}>
    <Text style={styles.postTitle}>{post.title}</Text>
    <Text style={styles.postDescription}>{post.description}</Text>
  </View>
)

const styles = StyleSheet.create({
    postWrapper: {
        backgroundColor: RNPOCColors.darkGray2,
        borderRadius: 5,
        marginBottom: RNPOCSpacings.verticalDistanceBig,
        paddingHorizontal: RNPOCSpacings.horizontalDistanceNormal,
        paddingVertical: RNPOCSpacings.horizontalDistanceNormal
    },
    postTitle: {
        color: RNPOCColors.lightGray,
        fontSize: RNPOCSpacings.fontSizeNormal,
        marginBottom: RNPOCSpacings.verticalDistanceSmall
    },
    postDescription: {
        color: RNPOCColors.lightGray,
    }
});

export default Post;

