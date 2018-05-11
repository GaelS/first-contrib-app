import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import '../node_modules/loaders.css/loaders.css';

import Disclaimer from './components/Disclaimer';
import { getToken, saveToken } from './login';
import MainApp from './App';

function getParams(location) {
  const searchParams = new URLSearchParams(location.search);
  return {
    query: searchParams.get('query') || '',
    language: searchParams.get('language') || '',
  };
}

function getSearchParamsURL({ query, language }) {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);
  searchParams.set('language', language);
  return searchParams.toString();
}

function search({ location, history }) {
  return function({ query, language }) {
    const { query: oldQuery, language: oldLanguage } = getParams(
      location.search,
    );
    const updatedQuery = query || oldQuery;
    const updatedLanguage = language || oldLanguage;

    history.push(
      `?${getSearchParamsURL({
        query: updatedQuery,
        language: updatedLanguage,
      })}`,
    );
  };
}

class App extends React.Component {
  render() {
    const { query, language } = this.state;
    return (
      <Router>
        <React.Fragment>
          <Route
            path="/"
            render={({ location, history }) => {
              const { query, language } = getParams(location);
              return (
                <MainApp
                  query={query}
                  language={language}
                  search={search({ location, history })}
                />
              );
            }}
          />
          <Route exact path="/disclaimer" component={Disclaimer} />
          <Route
            path="/login/:token"
            render={({ match }) => {
              const token = match.params.token;
              if (!!token) {
                saveToken(token);
              }
              return <Redirect to={!getToken() ? '/disclaimer' : '/'} />;
            }}
          />
        </React.Fragment>

      </Router>
    );
  }
}

const node = document.getElementById('react');
ReactDOM.render(<App />, node);
