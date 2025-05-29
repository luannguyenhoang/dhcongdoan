import { gql } from "@apollo/client";

export const GET_LUAT = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjQwOA==") {
      luat {
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
