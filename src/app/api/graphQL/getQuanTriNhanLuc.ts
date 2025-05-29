import { gql } from "@apollo/client";

export const GET_QUAN_TRI_NHAN_LUC = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjM4MA==") {
      quanTriNhanLuc {
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
