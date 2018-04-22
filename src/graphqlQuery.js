import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import flatten from 'lodash.flatten';
import orderBy from 'lodash.orderby';
import escape from 'lodash.escape';

import gql from 'graphql-tag';
import { labels } from './labels';
import createCards from './cards';
import { getToken, togglePopup } from './login';

const queryFromRepository = gql`
query Search($query: String!, $cursor: String) { 
  search(first : 20, query: $query, type: REPOSITORY, after: $cursor ){
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
    togglePopup({ display: true });
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
function cleanDataAndCreateCards(data, appendResults) {
  if (!data.search || !data.search.edges) {
    return [];
  }
  const trial = data.search.edges.reduce((acc, d) => {
    const { name, url, stargazers, languages } = d.node;
    const repository = {
      name,
      repositoryUrl: url,
      stars: stargazers.totalCount,
      language: languages.nodes.length ? languages.nodes[0].name : 'empty',
    };
    const issues = d.node.issues.nodes.map(issue => ({
      ...issue,
      title: escape(issue.title),
      issueUrl: issue.url,
      ...repository,
      labels: issue.labels.nodes,
    }));
    issues.length && acc.push(issues);
    return acc;
  }, []);
  const orderedIssues = orderBy(flatten(trial), 'createdAt', 'desc');
  window.lastCursor = data.search.edges[data.search.edges.length - 1].cursor;
  createCards(orderedIssues, appendResults);
}

function searchIssues({ keyword, language, page = 0, token }, appendResults) {
  if (!appendResults) {
    window.lastCursor = undefined;
  }
  return client
    .query({
      query: queryFromRepository,
      variables: {
        query: `${keyword} ${language && `language:${language}`}`,
        cursor: window.lastCursor,
      },
    })
    .then(results => cleanDataAndCreateCards(results.data, appendResults))
    .catch(
      error =>
        console.log('error', error) ||
        cleanDataAndCreateCards([], appendResults),
    );
}

export default searchIssues;
