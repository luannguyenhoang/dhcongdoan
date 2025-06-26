import { gql } from "@apollo/client";

export const GET_GIOI_THIEU = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjU4OA==") {
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
          imagevideo {
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
