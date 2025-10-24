import { gql } from "@apollo/client";

export const GET_NGANH_HOC_CHI_TIET = gql`
  query MyQuery($uri: String!) {
    pageBy(uri: $uri) {
      title
      nganh {
        nameBranch
        content
      }
    }
  }
`;
export const GET_SEO_BAO_HO_LAO_DONG = gql`
  query MyQuery {
    pageBy(uri: "nganh-dao-tao/bao-ho-lao-dong") {
      seo {
        fullHead
      }
    }
  }
`;
export const GET_SEO_CONG_TAC_XA_HOI = gql`
  query MyQuery {
    pageBy(uri: "nganh-dao-tao/cong-tac-xa-hoi") {
      seo {
        fullHead
      }
    }
  }
`;
export const GET_SEO_VIET_NAM_HOC = gql`
  query MyQuery {
    pageBy(uri: "nganh-dao-tao/viet-nam-hoc") {
      seo {
        fullHead
      }
    }
  }
`;
export const GET_SEO_QUAN_TRI_NHAN_LUC = gql`
  query MyQuery {
    pageBy(uri: "nganh-dao-tao/quan-tri-nhan-luc") {
      seo {
        fullHead
      }
    }
  }
`;
export const GET_SEO_LUAT = gql`
  query MyQuery {
    pageBy(uri: "nganh-dao-tao/luat") {
      seo {
        fullHead
      }
    }
  }
`;
export const GET_SEO_NGON_NGU_ANH = gql`
  query MyQuery {
    pageBy(uri: "nganh-dao-tao/ngon-ngu-anh") {
      seo {
        fullHead
      }
    }
  }
`;
