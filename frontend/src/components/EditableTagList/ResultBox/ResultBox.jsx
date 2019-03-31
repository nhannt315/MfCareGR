import React from 'react';
import PropTypes from 'prop-types';
import EditableTag from '../EditableTag/';

import './ResultBox.scss';

const resultBox = props => {
  return (
    <div id="result-box" className="card">
      {props.tagList.map(tag => <EditableTag key={tag.id} tag={tag} mode="add" onClick={props.addTag} />)}
    </div>
  );
};

resultBox.propTypes = {
  tagList: PropTypes.array,
  addTag: PropTypes.func
};

export default resultBox;
