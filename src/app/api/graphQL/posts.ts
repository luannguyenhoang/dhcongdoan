import { gql } from "@apollo/client";

export const GET_LATEST_POSTS = gql`
  query GetLatestPosts($count: Int!) {
    posts(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($size: Int!, $offset: Int!) {
    posts(where: { offsetPagination: { size: $size, offset: $offset } }) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        slug
        date
        excerpt
        commentCount
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($search: String!, $size: Int!, $offset: Int!) {
    posts(
      where: {
        search: $search
        offsetPagination: { size: $size, offset: $offset }
      }
    ) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        slug
        date
        excerpt
        commentCount
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export const GET_SAME_POSTS = gql`
  query GetPostsByCategory($category: String!, $size: Int!) {
    posts(first: $size, where: { categoryName: $category }) {
      nodes {
        title
        slug
        date
        excerpt
        commentCount
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
            name
            id
          }
        }
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($slug: String!, $size: Int!, $offset: Int!) {
    posts(
      where: {
        categoryName: $slug
        offsetPagination: { size: $size, offset: $offset }
      }
    ) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        slug
        date
        excerpt
        commentCount
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      slug
      date
      content
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories {
        nodes {
          slug
        }
      }

      seo {
        fullHead
      }
    }
  }
`;

export const GET_SITEMAP = gql`
  query GetSitemap($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
      }
    }
  }
`;

export const GET_SEO_TIN_TUC = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjYwOQ==") {
      seo {
        fullHead
      }
    }
  }
`;
export const GET_SEO_THONG_TIN_TUYEN_SINH = gql`
  query MyQuery {
    pageBy(id: "cG9zdDozMjYwNw==") {
      seo {
        fullHead
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY_ID = gql`
  query GetPostsByCategoryId($categoryId: ID!, $size: Int!, $offset: Int!) {
    posts(
      where: {
        categoryIn: [$categoryId]
        offsetPagination: { size: $size, offset: $offset }
      }
    ) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      nodes {
        title
        slug
        date
        excerpt
        commentCount
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
            id
          }
        }
      }
    }
  }
`;
