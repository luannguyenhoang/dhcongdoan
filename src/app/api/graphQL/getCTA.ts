import { gql } from "@apollo/client";

export const GET_CTA = gql`
  query MyQuery {
    pageBy(uri: "trang-chu") {
      trangChu {
        cta {
          text
          link
        }
      }
    }
  }
`;
