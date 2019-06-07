import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import scrollToComponent from 'react-scroll-to-component';

import './DiseaseDetailpage.scss';
import DiseaseService from '../../services/diseaseMedicineApi';

class DiseaseDetailPage extends PureComponent {
  state = {
    disease: {},
    isLoading: false,
    error: null,
    mostViewedList: [],
    mostViewedError: null
  };

  componentDidMount() {
    this.setState({isLoading: true});
    let slug = this.props.match.params.slug;
    document.title = 'Thông tin bệnh';
    this.fetchData(slug);
  }

  componentDidUpdate() {
    let slug = this.props.match.params.slug;
    if(this.state.disease.slug !== slug){
      this.fetchData(slug);
    }
  }

  fetchData = (slug) => {
    DiseaseService.getDiseaseDetail(slug)
      .then(resp => {
        this.setState({isLoading: false, disease: resp});
        document.title = `Thông tin bệnh ${resp.name}`;
      })
      .catch(error => {
        this.setState({isLoading: false, error: error});
      });
    DiseaseService.getMostViewedDiseases()
      .then(resp => {
        this.setState({mostViewedList: resp});
      })
      .catch(error => {
        this.setState({mostViewedError: error});
      });
  };

  render() {
    const {disease, mostViewedList} = this.state;
    return (
      <React.Fragment>
        <div id="disease-detail-page-title" className="page-title">
          <div className="disease-background" />
          <div className="mask">
            <div className="container">
              <Breadcrumb style={{margin: '0 1.5rem'}}>
                <Breadcrumb.Item>
                  <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/benh">Bệnh</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1>
                {disease.name}
              </h1>
            </div>
          </div>
        </div>
        <div id="disease-detail">
          <div id="sticky-wrapper" className="sticky-wrapper" style={{height: '4.5rem'}}>
            <nav className="sticky-nav">
              <div className="container">
                <div className="inner">
                  <ul>
                    <li>
                      <div>Tóm tắt</div>
                    </li>
                    {disease.overview ? <li onClick={() => scrollToComponent(this.overview)}>
                      <div>Tổng quan</div>
                    </li> : null}
                    {disease.cause ? <li onClick={() => scrollToComponent(this.cause)}>
                      <div>Nguyên nhân</div>
                    </li> : null}
                    {disease.prevent ? <li onClick={() => scrollToComponent(this.prevent)}>
                      <div>Phòng ngừa</div>
                    </li> : null}
                    {disease.treatment ? <li onClick={() => scrollToComponent(this.treatment)}>
                      <div>Điều trị</div>
                    </li> : null}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="container">
            <Row>
              <Col sm={16} md={16}>
                <div className="content">
                  <div ref={(section) => {this.brief = section;}}>
                    {disease.brief ? parse(disease.brief) : null}
                  </div>
                  <div ref={(section) => {this.overview = section;}}>
                    {disease.overview ? parse(disease.overview) : null}
                  </div>
                  <div ref={(section) => {this.cause = section;}}>
                    {disease.cause ? parse(disease.cause) : null}
                  </div>
                  <div ref={(section) => {this.prevent = section;}}>
                    {disease.prevent ? parse(disease.prevent) : null}
                  </div>
                  <div ref={(section) => {this.treatment = section;}}>
                    {disease.treatment ? parse(disease.treatment) : null}
                  </div>
                </div>
              </Col>
              <Col sm={8} md={8}>
                <aside>
                  <section className="top-list">
                    <h3>Các bênh được tìm kiếm nhiều nhất</h3>
                    <ul>
                      {mostViewedList.map(disease => (
                        <li key={disease.id}>
                          {/*<Link to={`/benh/${disease.slug}`} className="disease-image"/>*/}
                          <img className="disease-image" src={disease.images[0]} alt={disease.name}/>
                          <div className="body">
                            <h4><Link to={`/benh/${disease.slug}`}>{disease.name}</Link></h4>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                </aside>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

DiseaseDetailPage.propTypes = {
  match: PropTypes.object
};


export default withRouter(DiseaseDetailPage);