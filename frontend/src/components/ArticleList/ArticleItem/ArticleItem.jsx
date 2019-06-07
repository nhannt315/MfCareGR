import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Drawer} from 'antd';
import parse from 'html-react-parser';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ArticleItem.scss';

class ArticleItem extends React.PureComponent {

  state = {
    show: 'part',
    showDrawer: false
  };

  showFullContent = () => {
    // this.setState({show: 'full'});
    this.setState({showDrawer: true});
  };

  onClose = () => {
    this.setState({
      showDrawer: false,
    });
  };

  showPartContent = () => {
    this.setState({show: 'part'});
  };

  render() {
    const {article} = this.props;
    const placeholder = (
      <h2>
        <span className="read-more" onClick={this.showFullContent}>Đọc tiếp</span>
      </h2>
    );
    let fullContent = null;

    if (article.body_html) {
      fullContent = parse(article.body_html);
    }

    const showElement = this.state.show === 'full' ? fullContent : placeholder;
    return (
      <div className="cms-item">
        <Drawer
          width={860}
          title={article.title}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.showDrawer}
        >
          {fullContent}
        </Drawer>
        <h4><Link to={`/bai-viet/${article.slug}`}>{article.title}</Link></h4>
        <div className="cms-item-body">
          <div className="cms">
            <div className="thumbnail-image">
              <img src={article.thumbnail_image} alt={article.title} />
            </div>
            <div className="break-word">
              <div>
                <div className="rich-text">
                  <p>{article.intro}</p>
                </div>
                {showElement}
              </div>
            </div>
            <div className="cms-item-footer">
              <div className="source">
                <i aria-hidden={true}>
                  <FontAwesomeIcon icon="comments" />
                </i>
                {moment(article.published_date).format('HH:mm DD/MM/YYYY')}
                {this.state.show === 'full' ? (
                  <h2><span className="read-more" onClick={this.showPartContent}>Thu gọn</span></h2>
                ) : null}
              </div>
              <div className="view">2.2K lượt xem</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleItem.propTypes = {
  article: PropTypes.object
};

export default ArticleItem;
