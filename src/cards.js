import { ago } from 'time-ago';

function showLoadingSpinner() {
  const resultsNode = document.getElementById('results');
  clearChildren(resultsNode);
  const loadingSpinner = document.querySelector('.loading-container');
  const spinnerClone = loadingSpinner.cloneNode(true);
  resultsNode.append(spinnerClone);
  spinnerClone.classList.remove('hidden');
}

function createIssueCard({
  name,
  title,
  number,
  labels,
  updatedAt,
  createdAt,
  language,
  stars,
  repositoryUrl,
  issueUrl,
}) {
  const card = document.createElement('div');
  card.className = 'card';
  const labelsNodes = labels.map(label => createLabel(label)).join(' ');
  const timestampsNodes = [
    { updatedAt, label: 'Last Update' },
    { createdAt, label: 'Created' },
  ]
    .map(timestamp => createTimeStamp(timestamp))
    .join(' ');

  card.innerHTML = `
    <div class='card-container'>
      <div class='card-title'>
        <a class='link card-title-project' href=${repositoryUrl} target=_blank title='Go to ${name} repository'>
          <h2>${name}</h2>
        </a>
        <h1 class='card-title-issue'><a href=${issueUrl} target=_blank title='Go to the issue'>${title}</a></h1>
      </div>
      <div class='card-labels'>
        <div>${labelsNodes}</div>
      </div>
    </div>
    <div class='card-footer'>
      <div> <span class="noshrink star">★</span> ${stars}</div>
      <div class="noshrink">${language}</div>
      ${timestampsNodes}
      
    </div>
      
  `;
  return card;
}

function clearChildren(node) {
  if (node.hasChildNodes()) {
    const children = node.children;
    Object.values(node.children).map(child => child.remove());
  }
}

function createTitle(title) {
  return document.createTextNode(title);
}

function createLabel({ id, name, color }) {
  const shadow = `text-shadow: 0 0 0.2em #${color},0 0 0.2em #${color},0 0 0.2em #${color}`;
  const animation = Math.random() > 0.85
    ? `animation: flickering ${Math.random() * 3}s infinite; animation-delay: ${Math.ceil(Math.random() * 10)}s`
    : '';
  return `
    <div class='label' style='color:${color};${shadow};${animation};'>
      ${name}
    </div>`;
}

function createTimeStamp({ label, updatedAt, createdAt }) {
  return `
    <div class="noshrink timestamp">
      ${label} ${ago(updatedAt || createdAt)}
    </div>
  `;
}

export default function createCards(issues) {
  const resultsNode = document.getElementById('results');
  clearChildren(resultsNode);
  const cards = issues.map(issue => createIssueCard(issue));
  cards.forEach(card => resultsNode.append(card));
}
export { showLoadingSpinner };
