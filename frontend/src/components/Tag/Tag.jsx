import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './Tag.scss';

const Tag = props => {
  return (
    <Link to={`/chu-de/${props.tag.slug}`} className="cms-tag">{props.tag.name}</Link>
  );
};

Tag.propTypes = {
  tag: PropTypes.object
};

export default Tag;
