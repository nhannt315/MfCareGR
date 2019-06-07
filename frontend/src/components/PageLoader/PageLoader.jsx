import React from 'react';

import './PageLoader.scss';

const PageLoader = () => {
  return (
    <div className="main-loading" id="main-loading">
      <div className="body-loading">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
