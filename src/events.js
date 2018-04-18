import search from './graphqlQuery';
import { showLoadingSpinner } from './cards';
import { saveToken, getToken, togglePopup } from './login';

function toggleLanguageSelector() {
  const languages = document.querySelectorAll('.language-picker');
  return function(language) {
    languages.forEach(languagePicker =>
      languagePicker.classList.remove('active'),
    );
    if (language) {
      document.querySelector(`#${language}`).classList.add('active');
    }
  };
}

const toggleLanguagePicker = toggleLanguageSelector();

function initState() {
  const searchParams = new URLSearchParams(window.location.search);

  let state = {
    q: searchParams.get('q') || '',
    language: searchParams.get('language') || '',
  };

  const token = searchParams.get('token') || '';
  if (!!token) {
    saveToken(token);
  }
  togglePopup({ display: !getToken() });
  //Perform search if necessary
  if (!!state.q || !!state.language) {
    document.getElementById('searchInput').value = state.q;
    toggleLanguagePicker(state.language);
    showLoadingSpinner();
    search({ keyword: state.q, language: state.language });
  }

  function updateURLAndPerformSearch() {
    let newSearchParams = new URLSearchParams();
    newSearchParams.set('q', state.q);
    newSearchParams.set('language', state.language || 'javascript');
    const url = window.location.origin + '?' + newSearchParams.toString();
    window.history.pushState({ path: url }, 'search', url);
    toggleLanguagePicker(state.language);
    showLoadingSpinner();
    search({ keyword: state.q, language: state.language });
  }

  window.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateURLAndPerformSearch();
    }
  });

  document
    .getElementById('searchInput')
    .addEventListener('input', function(event) {
      state.q = event.target.value;

      event.target.className = !state.q ? 'empty' : '';
    });

  document
    .getElementById('searchButton')
    .addEventListener('click', function(event) {
      updateURLAndPerformSearch();
    });

  const languagePickers = document.querySelectorAll('.language-picker');
  languagePickers.forEach(picker =>
    picker.addEventListener('click', function(event) {
      state.language = event.target.id;
      updateURLAndPerformSearch();
    }),
  );

  return {
    getState: function() {
      return state;
    },
  };
}

export default initState;
