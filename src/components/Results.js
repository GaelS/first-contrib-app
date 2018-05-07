import React from 'react';
import { Query } from 'react-apollo';
import orderBy from 'lodash.orderby';
import flatten from 'lodash.flatten';

import Card from './Card';
import FetchMoreButton from './FetchMoreButton';
import LoadingSpinner from './LoadingSpinner';
import GET_ISSUES from '../graphqlQuery';

function formatData(data) {
  if (!data.search || !data.search.edges || data.search.edges.length === 0) {
    return { issues: [], cursor: undefined };
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
      title: issue.title,
      issueUrl: issue.url,
      ...repository,
      labels: issue.labels.nodes,
    }));
    issues.length && acc.push(issues);
    return acc;
  }, []);
  const orderedIssues = orderBy(flatten(trial), 'createdAt', 'desc');
  let cursor = data.search.edges[data.search.edges.length - 1].cursor;
  return { issues: orderedIssues, cursor };
}

export default ({ query, language }) => {
  let lastCursor;
  const queryVar = `${query} language:"${language}"`;
  return (
    <Query
      query={GET_ISSUES}
      variables={{
        query: queryVar,
      }}
      notifyOnNetworkStatusChange={true}
      cachePolicy="network-only"
    >
      {({ loading, error, data, fetchMore, networkStatus }) => {
        if (!query && !language) {
          //No search performed
          //Hack coz' skip not usable
          //on renderProps query Component AFAIK
          return;
        }
        const isFetchingMore = networkStatus === 3;
        if (loading && !isFetchingMore) {
          return <LoadingSpinner />;
        }
        const { issues, cursor } = formatData(data);
        lastCursor = cursor;
        return (
          <React.Fragment>
            <div className="results">
              {error && <div className="error">An error occured....</div>}
              {!error &&
                issues.map((issue, index) => {
                  return <Card key={issue.issueUrl} {...issue} />;
                })}
              {issues.length === 0 &&
                !error &&
                !loading &&
                !isFetchingMore &&
                <div className="no-results">No Results on this one...</div>}
              {isFetchingMore && <LoadingSpinner />}
              {!isFetchingMore &&
                issues.length !== 0 &&
                !error &&
                <FetchMoreButton
                  onClick={() =>
                    fetchMore({
                      variables: {
                        query: queryVar,
                        cursor: lastCursor,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                          ...prev,
                          search: {
                            ...prev.search,
                            edges: [
                              ...prev.search.edges,
                              ...fetchMoreResult.search.edges,
                            ],
                          },
                        };
                      },
                    })}
                />}
            </div>
          </React.Fragment>
        );
      }}
    </Query>
  );
};
