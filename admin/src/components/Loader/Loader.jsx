import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Loader.less';

const Loader = ({spinning = true, fullScreen}) => {
  return (
    <div
      className={classNames('loader', {
        ['hidden']: !spinning,
        ['fullScreen']: fullScreen,
      })}
    >
      <div className="wrapper">
        <div className="inner" />
        <div className="text">LOADING</div>
      </div>
    </div>
  )
};

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool,
};

export default Loader
