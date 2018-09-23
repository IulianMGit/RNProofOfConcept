import gql from "graphql-tag";

export default gql`
  {
    postCategories {
      _id
      name
    }
  }
`;
