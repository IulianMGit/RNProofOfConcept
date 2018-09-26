// dependencies
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// constants
import RNPOCColors from "../common/RNPOCColors";
import RNPOCSpacings from "../common/RNPOCSpacings";

// const navigateToPostDetail = () => {};

const Comment = ({ comment }) => (
  <View style={styles.postWrapper}>
    <Text style={styles.postTitle}>{comment.user.firstname}</Text>
    <Text style={styles.postDescription}>{comment.text}</Text>
  </View>
);

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

export default Comment;
