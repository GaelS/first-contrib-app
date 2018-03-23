import axios from 'axios';
import btoa from 'btoa-lite';
import labels from './labels';
import createCards from './cards.js';
import fixtures from './fixtures';
import zip from 'lodash.zip';

axios.defaults.headers.common[
  'Authorization'
] = `Basic ${btoa(`servauga@gmail.com:XXX`)}`;

const { total_count, items: issues } = fixtures;
createCards(issues);

function extractRepositoriesInfo(items) {
  return items.map(({
    data: { name, full_name, language, url, stars, repositoryUrl },
  }) => ({
    name,
    full_name,
    language,
    url,
    repositoryUrl,
    stars,
  }));
}

function extractIssuesInfo(rawIssues) {
  const { total_count, items } = rawIssues.data;
  return {
    total_count,
    issues: items.map(({
      title,
      number,
      labels,
      updatedAt,
      created_at,
      repository_url,
      repositoryUrl,
    }) => ({
      title,
      number,
      labels,
      updatedAt,
      created_at,
      repository_url,
      issueUrl: repositoryUrl,
    })),
  };
}
axios.get('https://api.github.com/rate_limit');

export default function search({ query }) {
  axios
    .get('https://api.github.com/search/issues', {
      params: {
        //access_token: token,
        q: `${query} ${labels}`,
        state: 'open',
      },
    })
    .then(results => {
      const { data: { total_count, items: rawIssues } } = results;
      return Promise.all(
        rawIssues.map(issue => axios.get(issue.repository_url)),
      )
        .then(items => ({
          issuesResults: extractIssuesInfo(results),
          repositories: extractRepositoriesInfo(items),
        }))
        .then(({ issuesResults: { issues, total_count }, repositories }) => {
          const finalData = zip(issues, repositories).map(([issue, repo]) =>
            Object.assign(issue, repo),
          );
          console.log(finalData[0]);
          createCards(finalData);
        })
        .catch(error => console.log(error));
    });
}
