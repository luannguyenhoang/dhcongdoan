import { gql } from "@apollo/client";

export const GET_ALL_NGANH_HOC = gql`
  query MyQuery {
    pageBy(uri: "trang-chu") {
      trangChu {
        trainingIndustry {
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
    pageBy(uri: "nganh-dao-tao") {
      seo {
        fullHead
      }
    }
  }
`;
