import { gql } from "@apollo/client";

export const GET_POPUP = gql`
  query MyQuery {
    pageBy(uri: "popup") {
      popup {
        imageDesktop {
          node {
            mediaItemUrl
          }
        }
        imageMobile {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;
