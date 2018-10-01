// dependencies
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// constants
import RNPOCColors from "../common/RNPOCColors";
import RNPOCSpacings from "../common/RNPOCSpacings";

const Comment = ({ comment }) => (
  <View style={styles.commentWrapper}>
    <Text style={styles.commentDetails}>{(comment.user || {}).firstname}</Text>
    <Text style={styles.commentDescription}>{comment.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  commentWrapper: {
    backgroundColor: RNPOCColors.darkGray2,
    borderRadius: 5,
    marginBottom: RNPOCSpacings.verticalDistanceBig,
    paddingHorizontal: RNPOCSpacings.horizontalDistanceNormal,
    paddingVertical: RNPOCSpacings.horizontalDistanceNormal
  },
  commentDetails: {
    color: RNPOCColors.lightGray,
    fontSize: RNPOCSpacings.fontSizeNormal,
    marginBottom: RNPOCSpacings.verticalDistanceSmall
  },
 commentDescription: {
    color: RNPOCColors.lightGray
  }
});

export default Comment;
