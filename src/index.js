import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router-dom';

import '../node_modules/loaders.css/loaders.css';

import Disclaimer from './components/Disclaimer';
import { getToken, saveToken } from './login';
import history from './history';
import MainApp from './App';

class App extends React.Component {
  state = {
    query: '',
    language: '',
  };
  // componentDidUpdate() {
  //   const searchParams = new URLSearchParams(history.location);
  //   const query = searchParams.get('query') || '';
  //   const language = searchParams.get('language') || '';
  //   console.log(args, query, language);
  //   if (language !== this.state.language || query !== this.state.query) {
  //     this.setState({
  //       query: searchParams.get('query') || '',
  //       language: searchParams.get('language') || '',
  //     });
  //   }
  // }
  componentDidMount() {
    const searchParams = new URLSearchParams(history.location.search);
    this.setState({
      query: searchParams.get('query') || '',
      language: searchParams.get('language') || '',
    });
  }
  search = ({ query, language }) => {
    const updatedQuery = query || this.state.query;
    const updatedLanguage = language || this.state.language;

    history.push(`?query=${updatedQuery}&language=${updatedLanguage}`);
    this.setState({ query: updatedQuery, language: updatedLanguage });
  };

  render() {
    const { query, language } = this.state;
    return (
      <Router history={history}>
        <React.Fragment>
          <Route
            path="/"
            render={() => (
              <MainApp query={query} language={language} search={this.search} />
            )}
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
