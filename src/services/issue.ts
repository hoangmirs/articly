import { gql, GraphQLClient } from 'graphql-request';

import { parseFrontmatter } from './frontmatter';

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
  number: number;
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

const getIssuesQuery = gql`
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
          number
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

const getIssueQuery = gql`
  query GetIssue($owner: String!, $name: String!, $number: Int!) {
    repository(name: $name, owner: $owner) {
      issue(number: $number) {
        author {
          login
          avatarUrl
        }
        id
        title
        body
        url
        createdAt
        number
        labels(first: 100) {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

const searchIssueNumberQuery = gql`
  query SearchIssue($query: String!) {
    search(query: $query, type: ISSUE, first: 1) {
      nodes {
        ... on Issue {
          number
        }
      }
    }
  }
`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

const getIssueId = (issue: Issue): string => {
  const id = parseFrontmatter(issue.body).id;

  if (!id) {
    return issue.number.toString();
  }

  return id;
};

export {
  getIssuesQuery,
  searchIssueNumberQuery,
  getIssueQuery,
  graphQLClient,
  getIssueId,
};
export type { IssuesConnection, Issue, Author, Label, PageInfo };
