import React from 'react';
import PropTypes from 'prop-types';

import './TagList.scss';
import Tag from '../Tag';

const TagList = props => {
  return (
    <div className="tags" style={props.style}>
      Chủ đề:
      {props.tagList.map(tag => <Tag key={tag.id} tag={tag} />)}
    </div>
  );
};

TagList.propTypes = {
  tagList: PropTypes.array,
  style: PropTypes.object
};

export default TagList;
