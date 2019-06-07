import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Tag.scss';

const Tag = ({tag, following, addRemoveTag}) => {
  return (
    <li className="p-w-sm">
      <div
        className={`tag ${following ? 'following' : 'not-following'}`}
        onClick={() => addRemoveTag(tag.id, !following, tag.name)}>
        {tag.name}
        <span className="thread-count p-w-xs">
          {tag.thread_ids.length}
          <i><FontAwesomeIcon icon="comments" /></i>
        </span>
        <span className="p-r-xs">
          {tag.user_ids.length}
          <i><FontAwesomeIcon icon="user-md" /></i>
        </span>
        {!following ? (
          <span className="follow">
            <i><FontAwesomeIcon icon="plus-circle" /></i>
          </span>
        ) : (
          <span className="unfollow">
            <i><Icon type="close" /></i>
          </span>
        )}
      </div>
    </li>
  );
};

Tag.propTypes = {
  tag: PropTypes.object,
  following: PropTypes.bool,
  addRemoveTag: PropTypes.func
};

export default Tag;
