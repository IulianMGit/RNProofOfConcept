// dependencies
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// constants
import RNPOCColors from "../common/RNPOCColors";
import RNPOCSpacings from "../common/RNPOCSpacings";


const Post = ({ post, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.postWrapper}>
    <Text style={styles.postTitle}>{post.title}</Text>
    <Text style={styles.postDescription}>{post.description}</Text>
  </TouchableOpacity>
);

export default Post;

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
    color: RNPOCColors.lightGray
  }
});

