import { gql } from "@apollo/client";

export const GET_LICH_KHAI_GIANG = gql`
  query MyQuery {
    pageBy(uri: "trang-chu") {
      trangChu {
        openingschedule {
          dateOpen
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
    pageBy(uri: "lich-khai-giang") {
      seo {
        fullHead
      }
    }
  }
`;

export const GET_CONTENT_LICH_KHAI_GIANG = gql`
  query MyQuery {
    pageBy(uri: "lich-khai-giang") {
      id
      lichKhaiGiang {
        content {
          title
          title2
          description
          item
        }
      }
    }
  }
`;
