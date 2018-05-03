import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import Search from './components/Search';
import { client } from './graphqlQuery';

//Override fragment for preact
React.Fragment = 'x-fragment';

export default function({ disclaimerOpen, search, query, language }) {
  return (
    <ApolloProvider client={client}>
      <Search search={search} query={query} language={language} />
    </ApolloProvider>
  );
}
