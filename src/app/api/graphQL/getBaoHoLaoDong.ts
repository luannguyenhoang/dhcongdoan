import { gql } from "@apollo/client";

export const GET_BAO_HO_LAO_DONG = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjMxOQ==") {
      baoHoLaoDong {
        content {
          title
          image {
            node {
              id
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
                  id
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
