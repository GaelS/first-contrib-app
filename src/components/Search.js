import React from 'react';

import LanguagesPicker from './LanguagesPicker';
import Results from './Results';

const PLACEHOLDER = 'search issues...';

class Search extends React.Component {
  state = { placeholder: PLACEHOLDER, value: '', dirty: false };

  submitSearchEvent = event => {
    if (event.key === 'Enter') {
      this.props.search({
        query: this.state.dirty ? this.state.value : this.props.query,
        language: this.props.language,
      });
    }
  };

  componentDidMount() {
    window.addEventListener('keypress', this.submitSearchEvent);
  }
  componentWillMount() {
    window.removeEventListener('keypress', this.submitSearchEvent);
  }

  resetPlaceholder = () => this.setState({ placeholder: '' });
  setPlaceholder = () => {
    const { dirty, value } = this.state;
    if ((!dirty && !this.props.query) || (dirty && !this.state.value)) {
      this.setState({ placeholder: PLACEHOLDER });
    }
  };

  render() {
    const { search, query, language } = this.props;
    return (
      <React.Fragment>
        <div id="search-bar">
          <input
            type="search"
            id="search-input"
            className="empty"
            onFocus={this.resetPlaceholder}
            onBlur={this.setPlaceholder}
            placeholder={this.state.placeholder}
            defaultValue={!this.state.dirty ? query : null}
            value={this.state.value}
            onChange={e =>
              this.setState({ dirty: true, value: e.target.value })}
          />
          <input
            type="button"
            id="search-button"
            value="GO!"
            onClick={() => search({ query: this.state.value , language})}
          />
          <LanguagesPicker
            updateLanguage={language =>
              search({ query: this.state.value, language })}
            language={language}
          />
        </div>
        <Results query={query} language={language} />
      </React.Fragment>
    );
  }
}

export default Search;
