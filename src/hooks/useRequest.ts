import { useQuery } from 'react-query';

import { GraphQLClient, gql } from 'graphql-request';

const API_URL = `https://api.github.com/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export const useGetIssues = () => {
  return useQuery('get-issues', async () => {
    const { issues } = await graphQLClient.request(gql`
      query {
        repository(name: "articly", owner: "hoangmirs") {
          issues(first: 10) {
            nodes {
              author {
                login
              }
              title
              bodyHTML
            }
            pageInfo {
              endCursor
              startCursor
            }
            totalCount
          }
        }
      }
    `);
    return issues;
  });
};
