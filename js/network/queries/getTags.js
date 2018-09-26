import gql from "graphql-tag";

export default gql`
  query getTags($filters: JSON, $options: JSON) {
    tags(filters: $filters, options: $options) {
      _id
      name
    }
  }
`;
