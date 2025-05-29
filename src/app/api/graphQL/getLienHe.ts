import { gql } from "@apollo/client";

export const GET_LIEN_HE = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjIwNA==") {
      lienHe {
        contact {
          title
          titleAdress
          address
          email
          phone
          titleForm
        }
      }
      seo {
        fullHead
      }
    }
  }
`;
