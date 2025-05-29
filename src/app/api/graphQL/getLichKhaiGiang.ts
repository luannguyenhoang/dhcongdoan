import { gql } from "@apollo/client";

export const GET_LICH_KHAI_GIANG = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjE4OQ==") {
      trangChu {
        openingschedule {
          title
          date
        }
      }
      seo {
        fullHead
      }
    }
  }
`;
export const GET_SEO_LICH_KHAI_GIANG = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjYxNA==") {
      seo {
        fullHead
      }
    }
  }
`;
