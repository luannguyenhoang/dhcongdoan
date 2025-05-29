import { gql } from "@apollo/client";

export const GET_GIOI_THIEU = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjUzOQ==") {
      id
      gioiThieu {
        introduce {
          title
          banner {
            node {
              mediaItemUrl
            }
          }
          title2
          description
          feature {
            text
          }
          idVideo
          imageVideo {
            node {
              mediaItemUrl
            }
          }
          whychooseourinstitution {
            title
            description
            feature {
              title
              description
            }
          }
        }
      }
      seo {
        fullHead
      }
    }
  }
`;
