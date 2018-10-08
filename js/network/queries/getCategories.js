import gql from "graphql-tag";

export default gql`
query getPostCategories($filters: JSON, $options: JSON) {
    postCategories(filters: $filters, options: $options) {
      _id
      name
    }
  }
`;
