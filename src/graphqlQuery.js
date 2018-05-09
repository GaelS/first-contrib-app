import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import flatten from 'lodash.flatten';
import orderBy from 'lodash.orderby';

import gql from 'graphql-tag';
import { labels } from './labels';
import { getToken } from './login';
import history from './history';

const queryFromRepository = gql`
query Search($query: String!, $cursor: String) { 
  search(first : 30, query: $query, type: REPOSITORY, after: $cursor ){
    edges{
      cursor
      node {
        ...on Repository{
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
          issues(first: 50, labels: [${labels.map(label => `"${label}"`)}], states: OPEN){
            nodes {
              ...on Issue {
                title
                url
                createdAt
                updatedAt
                labels(first: 10) {
                  nodes{
                  name
                  color
                  id
                }
              }
            }
          }      
        }
      }
    }
  }
}
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
  if (networkError && networkError.statusCode === 401) {
    history.push('/disclaimer');
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

export default queryFromRepository;
export { client };
