import React from 'react';
import { Query } from 'react-apollo';
import orderBy from 'lodash.orderby';
import flatten from 'lodash.flatten';

import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import GET_ISSUES from '../graphqlQuery';
import { responsePathAsArray } from 'graphql';

function formatData(data) {
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
    >
      {({ loading, error, data, fetchMore, networkStatus }) => {
        const isFetchingMore = networkStatus === 3;
        if (loading && !isFetchingMore) {
          return <LoadingSpinner />;
        }
        if (error) {
          return <div>A bug occured....</div>;
        }
        const { issues, cursor } = formatData(data);
        lastCursor = cursor;
        return (
          <React.Fragment>
            <div className="results">
              {issues.map((issue, index) => {
                return <Card key={issue.issueUrl} {...issue} />;
              })}
              {isFetchingMore && <LoadingSpinner />}
              {!isFetchingMore &&
                <button
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
