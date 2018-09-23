import gql from "graphql-tag";

export default gql`
 query getPosts($filters: JSON, $options: JSON){
  posts(filters: $filters, options: $options) {
    _id
    userId
    title
    description
  }
}
`;
