import gql from "graphql-tag";

export default gql`
  mutation addComment($input: CommentCreateInput) {
    addComment(input: $input) {
      _id
      text
    }
  }
`;
