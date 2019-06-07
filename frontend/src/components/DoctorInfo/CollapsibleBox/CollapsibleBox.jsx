import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CollapsibleBox.scss';

class CollapsibleBox extends PureComponent {

  state = {
    collapse: false
  };

  componentDidMount() {
    const {list, strContent} = this.props;
    if (!strContent && (!list || list.length === 0)) {
      this.setState({collapse: true});
    }
  }

  triggerCollapse = () => {
    this.setState({collapse: !this.state.collapse});
  };

  render() {
    const {title, icon, contentType, list, strContent} = this.props;
    const {collapse} = this.state;
    let renderContent = null;
    if (contentType === 'list') {
      renderContent = (
        <div className="collapsible-target text-bold">
          <ul>
            {list && list.map(item => <li key={`${item}-${Math.random()}`}>{item}</li>)}
          </ul>
        </div>
      );
    } else if (contentType === 'info') {
      renderContent = (
        <div className="collapsible-target has-readmore-content custom-readmore-content">
          <div className="cms">
            <p>{strContent}</p>
          </div>
        </div>
      );
    }
    if (!strContent && (!list || list.length === 0)) {
      renderContent = (
        <div className="collapsible-target text-bold">
          <em className="no-content">Thông tin chưa được cập nhật.</em>
        </div>
      );
    }
    return (
      <div className="collapsible-container collapsible-block screen-lg expanded">
        <div className="collapsible-header">
          <div className="collapsible-trigger" onClick={this.triggerCollapse}>
            <i><FontAwesomeIcon icon={icon} /></i>
            {title}
            <i style={{float: 'right'}}><FontAwesomeIcon icon={collapse ? 'angle-right' : 'angle-down'} /></i>
          </div>
        </div>
        {!collapse && renderContent}
      </div>
    );
  }
}

CollapsibleBox.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  contentType: PropTypes.oneOf(['info', 'list']),
  list: PropTypes.array,
  strContent: PropTypes.string
};

export default CollapsibleBox;