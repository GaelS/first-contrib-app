import React from 'react';

import LanguagesPicker from './LanguagesPicker';
import Results from './Results';

const PLACEHOLDER = 'Browse repositories';

class Search extends React.Component {
  state = { placeholder: PLACEHOLDER, value: '', dirty: false };

  setPlaceholder = () => this.setState({ placeholder: PLACEHOLDER });
  resetPlaceholder = () => this.setState({ placeholder: '' });

  render() {
    const { search, query, language } = this.props;
    return (
      <React.Fragment>
        <div id="searchBar">
          <input
            type="search"
            id="searchInput"
            className="empty"
            onFocus={this.resetPlaceholder}
            placeholder={this.state.placeholder}
            defaultValue={!this.state.dirty ? query : null}
            value={this.state.value}
            onChange={e =>
              this.setState({ dirty: true, value: e.target.value })}
          />
          <input
            type="button"
            id="searchButton"
            value="GO!"
            onClick={() => search({ query: this.state.value })}
          />
          <LanguagesPicker
            updateLanguage={language => search({ language })}
            language={language}
          />
        </div>
        <Results query={query} language={language} />
      </React.Fragment>
    );
  }
}

export default Search;
