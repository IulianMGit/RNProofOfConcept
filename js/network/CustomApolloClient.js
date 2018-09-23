// depedencies
import ApolloClient from "apollo-boost";

// constants
import RNPOCStringConstants from "../common/RNPOCStringConstrants";

const client = new ApolloClient({
  uri: RNPOCStringConstants.endpointUri
});

export default client;
