import gql from "graphql-tag";

export default gql`
  query getUsers($filters: JSON, $options: JSON) {
    users(filters: $filters, options: $options) {
      _id
      firstname
    }
  }
`;
