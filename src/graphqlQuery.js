import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

import gql from 'graphql-tag';
import labels from './labels';
import createCards from './cards';
import { getToken, redirectToLogin } from './login';

const query = gql` 
  query Search(${labels.map((_, index) => `$query${index}: String!`)}){
  ${labels.map((_, index) => {
  return `
      query${index}: search(first : 10, query: $query${index}, type: ISSUE){
        issueCount
        nodes{
          ...on Issue {
          title
          updatedAt
          createdAt
          number
          url
          labels(first: 5){
            nodes{
              color
              name
              id
            }
          }
          repository {
            name
            url
            
          stargazers {
            totalCount
          }
          languages(first: 1, orderBy:{field: SIZE, direction: DESC}) {
            nodes {
              name
            }
          }
        } 
          }
        }
      }
    `;
})}
  }
  `;

const cache = new InMemoryCache();

const AuthLink = (operation, forward) => {
  operation.setContext(context => ({
    ...context,
    headers: { ...context.headers, authorization: `Bearer ${getToken()}` },
  }));
  return forward(operation);
};

const ErrorLink = onError(({ graphqlErrors, networkError }) => {
  if (networkError.statusCode === 401) {
    redirectToLogin();
  }
});

const link = ApolloLink.from([
  ErrorLink,
  AuthLink,
  new HttpLink({ uri: 'https://api.github.com/graphql' }),
]);

const client = new ApolloClient({
  addTypename: true,
  link,
  cache,
});

function cleanDataAndCreateCards(data) {
  const zippedIssues = Object.values(data).reduce(
    (acc, { issueCount, nodes }) => {
      acc.issueCount = acc.issueCount + issueCount || 0;
      acc.issues = [...acc.issues, ...nodes];
      return acc;
    },
    { issueCount: 0, issues: [] },
  );
  const trial = zippedIssues.issues.map(issue => {
    const {
      title,
      number,
      labels = {},
      updatedAt,
      createdAt,
      url,
      repository = {},
    } = issue;

    return {
      title: title,
      number: number,
      updatedAt: updatedAt,
      createdAt: createdAt,
      issueUrl: url,
      repositoryUrl: repository.url,
      labels: labels.nodes,
      name: repository.name,
      language: repository.languages.nodes.length
        ? repository.languages.nodes[0].name
        : 'empty',
      stars: repository.stargazers.totalCount,
    };
  });
  createCards(trial);
}

function searchIssues({ keyword, language, page = 0, token }) {
  return client
    .query({
      query,
      variables: labels.reduce(
        (acc, label, index) => {
          acc[
            `query${index}`
          ] = `${keyword} language:${language} type:issue ${label}`;
          return acc;
        },
        { page: (page + 1) * 10 },
      ),
    })
    .then(results => cleanDataAndCreateCards(results.data))
    .catch(error => console.log('error', error));
}

export default searchIssues;
