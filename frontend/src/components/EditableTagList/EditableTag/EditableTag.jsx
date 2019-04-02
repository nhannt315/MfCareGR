import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './EditableTag.scss';

const EditableTag = props => {
  const icon = props.mode === 'add' ? 'plus-circle' : 'times-circle';
  return (
    <div className="cms-tag" onClick={() => props.onClick(props.tag)}>
      {props.tag.name}
      <i><FontAwesomeIcon icon={icon} /></i>
    </div>
  );
};

EditableTag.propTypes = {
  tag: PropTypes.object,
  mode: PropTypes.string,
  onClick: PropTypes.func
};

export default EditableTag;
