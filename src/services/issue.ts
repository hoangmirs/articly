import { gql, GraphQLClient } from 'graphql-request';

const API_URL = `https://api.github.com/graphql`;

type Author = {
  login: string;
  url: string;
  avatarUrl: string;
};

type IssuesConnection = {
  nodes: [Issue];
  pageInfo: PageInfo;
  totalCount: number;
};

type Issue = {
  id: string;
  author: Author;
  title: string;
  body: string;
  url: string;
  labels: {
    nodes: Label[];
  };
  userContentEdits: string[];
  createdAt: string;
};

type Label = {
  name: string;
  color: string;
  id: string;
};

type PageInfo = {
  endCursor: string;
  startCursor: string;
};

const GetIssuesQuery = gql`
  query GetIssues(
    $owner: String!
    $name: String!
    $labels: [String!]
    $perPage: Int!
  ) {
    repository(name: $name, owner: $owner) {
      issues(first: $perPage, labels: $labels) {
        nodes {
          author {
            login
            avatarUrl
          }
          id
          title
          body
          url
          createdAt
          labels(first: 100) {
            nodes {
              id
              name
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
        }
        totalCount
      }
    }
  }
`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export { GetIssuesQuery, graphQLClient };
export type { IssuesConnection, Issue, Author, Label, PageInfo };
