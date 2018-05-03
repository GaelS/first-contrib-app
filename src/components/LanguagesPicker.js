import React from 'react';

const languages = {
  javascript: 'Javascript',
  go: 'Go',
  c: 'C+',
  css: 'CSS',
  java: 'Java',
  python: 'Python',
  ocaml: 'Ocaml',
  ruby: 'Ruby',
};

export default ({ updateLanguage, language }) => (
  <div className="language-pickers">
    {Object.entries(languages).map(([id, lang], index) => (
      <React.Fragment>
        <a
          className={`language-picker ${id === language && 'active'}`}
          title="Search issues in project written in javascript"
          id={id}
          key={id}
          onClick={e => updateLanguage(e.target.id)}
        >
          {lang}
        </a>
        {index < 7 && <span className="separator">{' // '}</span>}
      </React.Fragment>
    ))}{' '}
  </div>
);
