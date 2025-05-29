import { gql } from "@apollo/client";

export const GET_NGON_NGU_ANH = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjQzNQ==") {
      ngonNguAnh {
        content {
          title
          image {
            node {
              mediaItemUrl
            }
          }
          overview {
            title
            courseDetails {
              content
            }
            courseContent
          }
          curriculum {
            title
            courseDetails {
              content
            }
            coursecontent
          }
          instructor {
            title
            courseDetails {
              tex
            }
            teacher {
              name
              role
              avarta {
                node {
                  mediaItemUrl
                }
              }
            }
            courseContent
          }
        }
      }
      seo {
        fullHead
      }
    }
  }
`;
