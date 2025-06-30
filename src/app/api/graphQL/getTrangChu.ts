import { gql } from "@apollo/client";

export const GET_TRANG_CHU = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjE4OQ==") {
      trangChu {
        openingschedule {
          banner {
            node {
              mediaItemUrl
            }
          }
          title
          date
        }
        slider {
          content {
            image {
              node {
                mediaItemUrl
              }
            }
            title
            description
            link
          }
          introduce {
            title
            description
          }
        }
        welcometo {
          title1
          title2
          description
          link
          image {
            node {
              mediaItemUrl
            }
          }
        }
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
        videoTour {
          title
          description
          idVideo
        }
        teacher {
          avatar {
            node {
              mediaItemUrl
            }
          }
          name
          role
        }
        parameter {
          number
          text
        }
        evaluate {
          title
          comment {
            avarta {
              node {
                mediaItemUrl
              }
            }
            name
            role
            content
          }
        }
        cooperationunit {
          image {
            node {
              mediaItemUrl
            }
          }
        }
      }
      seo {
        fullHead
      }
    }
  }
`;
