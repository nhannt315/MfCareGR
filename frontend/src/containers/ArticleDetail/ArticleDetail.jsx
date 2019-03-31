import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Row, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import { BulletList } from 'react-content-loader';

import ArticleService from '../../services/articleService';
import PropTypes from 'prop-types';

import TagList from '../../components/TagList';
import './ArticleDetail.scss';

class ArticleDetail extends PureComponent {

  state = {
    article: {
      tags: []
    },
    loading: false,
    error: null,
    relatedArticles: [],
    relatedLoading: false,
    relatedError: null
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
    this.fetchArticleData(slug);
  }

  componentDidUpdate() {
    let slug = this.props.match.params.slug;
    if (this.state.article.slug !== slug) {
      this.fetchArticleData(slug);
    }
  }

  fetchArticleData = (slug) => {
    this.setState({loading: true});
    ArticleService.getArticleDetail(slug)
      .then(resp => {
        this.setState({loading: false, article: resp});
        let tagIds = resp.tags.map(tag => tag.id);
        this.fetchRelatedArticles(tagIds);
      })
      .catch(error => {
        this.setState({loading: false, error: error.data});
      });
  };

  fetchRelatedArticles = (tagIds) => {
    this.setState({relatedLoading: true});
    ArticleService.getRelatedArticles(tagIds)
      .then(resp => {
        this.setState({relatedLoading: false, relatedArticles: resp});
      })
      .catch(error => {
        this.setState({relatedLoading: false, error: error.data});
      });
  };

  render() {
    const {article, relatedArticles, relatedLoading} = this.state;
    const body = article.body_html ? parse(article.body_html) : null;
    const placeHolder = [];
    for (var i = 0; i < 15; i++) {
      placeHolder.push(<BulletList width={400} />);
    }
    return (
      <div id="detail-cms" className="clearfix container p-w-sm">
        <Row>
          <div className="post-content">
            <Col xs={24} md={16} className="content">
              <div className="detail-header">
                <h1>{article.title}</h1>
                <div className="question-images">
                  <figure className="post-image full loaded-image">
                    <img src={article.medium_image} alt={article.title} />
                  </figure>
                </div>
              </div>
              <div className="detail-body clearfix">
                <div className="block-content cms">
                  {body}
                </div>
                <TagList tagList={article.tags} />
              </div>
            </Col>
            <Col xs={24} md={8} className="aside">
              <section className="top-list">
                <h3>
                  <i aria-hidden="true"><FontAwesomeIcon icon="thumbs-up" /></i>
                  Có thể bạn quan tâm
                </h3>
                {relatedLoading ? placeHolder : (
                  <ul className="recent-list">
                    {relatedArticles.map(article => (
                      <li key={article.id}>
                        <div className="body">
                          <h4><Link to={`/bai-viet/${article.slug}`}>{article.title}</Link></h4>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

ArticleDetail.propTypes = {
  match: PropTypes.object
};


export default withRouter(ArticleDetail);