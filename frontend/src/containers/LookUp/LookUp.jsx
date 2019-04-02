import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CommonService from '../../services/commonService';
import ArticleService from '../../services/articleService';
import './LookUp.scss';

class LookUp extends PureComponent {
  mounted = false;

  state = {
    doctor: null,
    medicine: null,
    disease: null,
    error: null,
    topArticles: [],
    totalArticles: 0
  };

  componentDidMount() {
    this.mounted = true;
    CommonService.getLookupData()
      .then(result => {
        if (!this.mounted) {return;}
        this.setState(result);
      })
      .catch(err => {
        if (!this.mounted) {return;}
        this.setState({error: err});
      });
    ArticleService.getTopArticles()
      .then(result => {
        if (!this.mounted) {return;}
        this.setState({
          topArticles: result.articles,
          totalArticles: result.total
        });
      })
      .catch(error => {
        if (!this.mounted) {return;}
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {topArticles, totalArticles} = this.state;
    const articleList = topArticles.map(article => (
      <Col xs={12} md={5} key={article.id}>
        <Link to={`/bai-viet/${article.slug}`}>
          <img
            src={article.medium_image}
            alt={article.title}
          />
          <h4>{article.title}</h4>
        </Link>
      </Col>
    ));
    return (
      <div className="listing-index p-b-xl bg-light-gray">
        <div className="container">
          <Row style={{textAlign: 'center'}}>
            <Col xs={20} md={20} offset={2}>
              <Row className="grid-container">
                <Col xs={8} sm={6} className="text-center">
                  <article className="bg-white grid-item">
                    <Link to="/danh-sach-bac-si">
                      <i>
                        <FontAwesomeIcon icon="user-md" />
                      </i>
                      <span>{this.state.doctor}</span>
                      <h4>Bác sĩ</h4>
                    </Link>
                  </article>
                </Col>
                <Col xs={8} sm={6} className="text-center">
                  <article className="bg-white grid-item">
                    <Link to="/benh">
                      <i>
                        <FontAwesomeIcon icon="bed" />
                      </i>
                      <span>{this.state.disease}</span>
                      <h4>Loại bệnh</h4>
                    </Link>
                  </article>
                </Col>
                <Col xs={8} sm={6} className="text-center">
                  <article className="bg-white grid-item">
                    <Link to="/thuoc">
                      <i>
                        <FontAwesomeIcon icon="toggle-on" />
                      </i>
                      <span>{this.state.medicine}</span>
                      <h4>Thuốc</h4>
                    </Link>
                  </article>
                </Col>
              </Row>

            </Col>
            <Col xs={18} md={18} offset={3}>
              <Row>
                <article className="bg-white full-item">
                  <div className="item-header">
                    <i>
                      <FontAwesomeIcon icon="newspaper" />
                    </i>
                    {'Bài viết - Tin tức'}
                  </div>
                  <div className="item-body">
                    <Row className="grid-container">
                      {articleList}
                    </Row>
                  </div>
                  <Col xs={24}>
                    <Link to="/hoi-bac-si" className="view-more">
                      Xem thêm ({totalArticles})
                    </Link>
                  </Col>
                </article>

              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


export default LookUp;
