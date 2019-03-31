import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FilterButton.scss';

const FilterButton = props => {
  return (
    <div className="filter-button" onClick={() => props.onClick(props.type)}>
      <i><FontAwesomeIcon icon={props.iconName} /></i>
      <span>{props.title}</span>
    </div>
  );
};

FilterButton.propTypes = {
  iconName: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default FilterButton;
