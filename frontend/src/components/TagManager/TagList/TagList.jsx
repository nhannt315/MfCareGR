import React from 'react';
import PropTypes from 'prop-types';

import './TagList.scss';
import Tag from '../Tag';

const TagList = ({tagList, userTagList, addRemoveTag}) => {
  return (
    <div style={{display: 'inline-block'}}>
      <div className="tag-content search-tags">
        <ul className="list-unstyled no-margins">
          {tagList.map(tag => <Tag
            key={tag.id} tag={tag} following={userTagList.includes(tag.id)}
            addRemoveTag={addRemoveTag} />
          )}
        </ul>
      </div>
    </div>
  );
};

TagList.propTypes = {
  tagList: PropTypes.array,
  userTagList: PropTypes.array,
  addRemoveTag: PropTypes.func
};

export default TagList;
