import gql from "graphql-tag";

export default gql`
  query getPostDetails($filters: JSON, $options: JSON) {
    posts(filters: $filters, options: $options) {
      _id
      title
      description

      tags {
        name
      }

      user {
        firstname
        lastname
      }

      comments {
        _id
        text
        user {
          firstname
          lastname
        }
      }

      category {
        name
      }

      createdAt
    }
  }
`;
