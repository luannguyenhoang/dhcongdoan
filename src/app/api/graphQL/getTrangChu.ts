import { gql } from "@apollo/client";

export const GET_TRANG_CHU = gql`
  query MyQuery {
    pageBy(uri: "trang-chu") {
      trangChu {
        banner {
          imageDaoTao {
            node {
              mediaItemUrl
            }
          }
          descriptionFeature
          items {
            title
            text
          }
          imageWomen {
            node {
              mediaItemUrl
            }
          }
          imageFeature {
            node {
              mediaItemUrl
            }
          }
          imageLoiThe {
            node {
              mediaItemUrl
            }
          }
          itemsLoiThe {
            title
            text
          }
          text
          title
          titleFeature
          titleLoiThe
        }
        information {
          title
          text
          images {
            node {
              mediaItemUrl
            }
          }
          items {
            title
            text
            item
          }
        }
        degree {
          images {
            node {
              mediaItemUrl
            }
          }
          title
          text
          description
        }
        certificateSection {
          image {
            node {
              mediaItemUrl
            }
          }
          imageHocTap {
            node {
              mediaItemUrl
            }
          }
          items {
            text
          }
        }
        registrationBanner
        openingScheduleSection {
          studentImage {
            node {
              mediaItemUrl
            }
          }
          imageText {
            node {
              mediaItemUrl
            }
          }
          openingSchedule {
            location
            date
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
        title
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
      }
      seo {
        fullHead
      }
    }
  }
`;
