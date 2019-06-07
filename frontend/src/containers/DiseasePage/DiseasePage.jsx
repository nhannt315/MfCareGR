import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Spin } from 'antd';
import scrollToComponent from 'react-scroll-to-component';

import DiseaseService from '../../services/diseaseMedicineApi';
import DiseaseSection from '../../components/DiseaseSection';
import './DiseasePage.scss';


class DiseasePage extends PureComponent {

  state = {
    diseases: [],
    isLoading: false,
    error: null
  };

  componentDidMount() {
    document.title = 'Danh sách bệnh';
    this.setState({isLoading: true});
    DiseaseService.getDiseases()
      .then(resp => {
        this.setState({diseases: resp, isLoading: false});
      })
      .catch(error => {
        this.setState({error: error, isLoading: false});
      });
  }

  scrollToTop = () => {
    scrollToComponent(this.DiseaseIndex);
  };

  scrollToSection = (character) => {
    scrollToComponent(this[character], {offset: 0, align: 'top'});
  };

  render() {
    const {diseases} = this.state;
    return (
      <React.Fragment>
        <div className="page-title">
          <div className="mask">
            <div className="position">
              <Breadcrumb style={{margin: '0 1.5rem'}}>
                <Breadcrumb.Item>
                  <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/benh">Bệnh</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1>
                Danh sách bệnh
              </h1>
            </div>
          </div>
        </div>
        <div className="position">
          <div id="disease-list">
            <div className="content">
              <section className="disease-index" ref={(section) => {this.DiseaseIndex = section;}}>
                <h3>Tra theo bảng chữ cái</h3>
                <ul>
                  {diseases.map(disease => (
                    <li key={disease[0]}>
                      <div onClick={() => this.scrollToSection(disease[0])}>{disease[0]}</div>
                    </li>
                  ))
                  }
                </ul>
              </section>
              <Spin spinning={this.state.isLoading}>
                {diseases.map(disease => (
                  <DiseaseSection
                    ref={(section) => {this[disease[0]] = section;}}
                    key={disease[0]}
                    character={disease[0]}
                    diseaseList={disease[1]}
                    scrollToTop={this.scrollToTop}
                  />
                ))}
              </Spin>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default DiseasePage;