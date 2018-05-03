import React from 'react';

import palmTree from '../../static/palm-tree.png';

export default () => (
  <div className="login-popup-container">
    <div className="login-popup">
      <h2 className="card-title-project disclaimer-title">Disclaimer</h2>
      <h2 className="card-title-issue">
        Your Github credentials are required !
      </h2>
      <p className="disclaimer-content">
        This app is powered by the Graphql Github API which requires to be authenticated to be used... That's all !
        {' '}
      </p>
      <div className="buttons-container">
        <a
          href={process.env.AUTH_URL}
          className="button-ok"
          title="Go to the app !"
        >
          Ok
        </a>
        <a
          className="button-nope"
          title="Go back to Github"
          href="http://github.com"
        >
          Never !
        </a>
      </div>
      <img className="disclaimer-palm-tree" src={palmTree} alt="Palm Tree" />
    </div>
  </div>
);
