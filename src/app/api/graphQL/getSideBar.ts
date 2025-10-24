import { gql } from "@apollo/client";

export const GET_SIDE_BAR = gql`
  query MyQuery {
    allSlideBar {
      nodes {
        sliderBarContent {
          image {
            node {
              mediaItemUrl
            }
          }
          sideBar {
            icon
            textLeft
            textRight
          }
        }
      }
    }
  }
`;
