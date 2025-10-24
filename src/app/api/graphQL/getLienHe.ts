import { gql } from "@apollo/client";

export const GET_LIEN_HE = gql`
  query MyQuery {
    pageBy(uri: "lien-he=") {
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
