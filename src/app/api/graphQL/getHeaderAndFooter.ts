import { gql } from "@apollo/client";

export const GET_HEADER_AND_FOOTER = gql`
  query MyQuery {
    pageBy(uri: "trang-chu") {
      trangChu {
        header {
          logo {
            node {
              mediaItemUrl
            }
          }
          titlephone
          phone
          titleemail
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
            titleaddress
            address {
              text
            }
            titleemail
            linkemail
            email
            titlephone
            linkphone
            phone
          }
          linkFacebook
          linkYoutube
          linkzalo
          logo02 {
            node {
              mediaItemUrl
            }
          }
          copyRight
        }
      }
    }
  }
`;
