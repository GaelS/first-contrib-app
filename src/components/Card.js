import React from 'react';
import { ago } from 'time-ago';

function Footer({ language, timestamps, stars }) {
  return (
    <div className="card-footer">
      <div> <span className="noshrink star">★</span> {stars}</div>
      <div className="noshrink">{language}</div>
      {timestamps.map(({ label, value }) => (
        <div className="noshrink timestamp">
          {`${label} ${ago(value)}`}
        </div>
      ))}
    </div>
  );
}

function Labels({ labels }) {
  const labelsNodes = labels.map(({ id, name, color }) => {
    const textShadow = `0 0 0.2em #${color},0 0 0.2em #${color},0 0 0.2em #${color}`;
    const animation = Math.random() > 0.5
      ? `flickering ${Math.random() * 3}s infinite; animation-delay: ${Math.ceil(Math.random() * 10)}s`
      : '';

    return (
      <div key={id} className="label" style={{ color, textShadow, animation }}>
        {name}
      </div>
    );
  });

  return (
    <div className="card-labels">
      {labelsNodes}
    </div>
  );
}

export default function({
  repositoryUrl,
  name,
  issueUrl,
  title,
  labels,
  language,
  stars,
  updatedAt,
  createdAt,
}) {
  const timestamps = [
    { value: updatedAt, label: 'Last Update' },
    { value: createdAt, label: 'Created' },
  ];

  return (
    <div className="card">
      <div className="card-container">
        <div className="card-title">
          <a
            className="link card-title-project"
            href={repositoryUrl}
            target="_blank"
            title={`Go to ${name} repository`}
          >
            <h2>{name}</h2>
          </a>
          <h1 className="card-title-issue">
            <a href={issueUrl} target="_blank" title="Go to the issue">
              {title}
            </a>
          </h1>
        </div>
        <Labels labels={labels} />
      </div>
      <Footer language={language} timestamps={timestamps} stars={stars} />
    </div>
  );
}
