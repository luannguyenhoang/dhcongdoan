import { gql } from "@apollo/client";

export const GET_TEST = gql`
  query MyQuery {
    pageBy(uri: "test") {
      content
    }
  }
`;
