import { gql } from "@apollo/client";

export const GET_CONG_TAC_XA_HOI = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjM1Mg==") {
      congTacXaHoi {
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
