import { gql } from "@apollo/client";

export const GET_VIET_NAM_HOC = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjQ2NQ==") {
      vietNamHoc {
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
