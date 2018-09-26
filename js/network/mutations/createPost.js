import gql from "graphql-tag";

export default gql`
  mutation addPost($input: PostCreateInput) {
    addPost(input: $input) {
      _id
      title
      description
      createdAt
    }
  }
`;
