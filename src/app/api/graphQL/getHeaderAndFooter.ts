import { gql } from "@apollo/client";

export const GET_HEADER_AND_FOOTER = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjE4OQ==") {
      trangChu {
        header {
          logo {
            node {
              mediaItemUrl
            }
          }
          titlePhone
          phone
          titleEmail
          email
        }
        footer {
          logo {
            node {
              mediaItemUrl
            }
          }
          description
          contacts {
            titleAddress
            address
            titleEmail
            linkEmail
            email
            titlePhone
            linkPhone
            phone
          }
          linkFacebook
          linkYoutube
          linkZalo
        }
      }
    }
  }
`;
