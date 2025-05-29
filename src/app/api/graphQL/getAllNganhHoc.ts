import { gql } from "@apollo/client";

export const GET_ALL_NGANH_HOC = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjE4OQ==") {
      trangChu {
        trainingIndustry {
          video {
            idVideo
            image {
              node {
                mediaItemUrl
              }
            }
          }
          title
          banner {
            node {
              mediaItemUrl
            }
          }
          industrygroups {
            industryname
            description
            image {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_SEO_ALL_NGANH_HOC = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjYxNg==") {
      seo {
        fullHead
      }
    }
  }
`;
