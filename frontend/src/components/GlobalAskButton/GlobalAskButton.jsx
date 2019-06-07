import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import './GlobalAskButton.scss';

const GlobalAskButton = props => {
  const currentPath = props.history.location.path;
  if (currentPath === '/hoi-bac-si' || currentPath === '/hoi-bac-si/dat-cau-hoi')
    return null;
  return (
    <div className="global-thread-create-cta">
      <Button icon="edit" onClick={() => props.history.push('/hoi-bac-si/dat-cau-hoi')}>
        Đặt câu hỏi
      </Button>
    </div>
  );
};

GlobalAskButton.propTypes = {
  history: PropTypes.object
};

export default GlobalAskButton;
