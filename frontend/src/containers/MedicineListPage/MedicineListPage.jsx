import React, { PureComponent } from 'react';
import { Breadcrumb, Spin } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import qs from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import MedicineApi from '../../services/diseaseMedicineApi';
import MedicineList from '../../components/MedicineList';
import './MedicineListPage.scss';

class MedicineListPage extends PureComponent {
  state = {
    currentPage: 0,
    totalPage: 1,
    medicineList: [],
    isLoading: false,
    error: null,
    medicineTypeSlug: null,
    medicineTypeName: null
  };

  componentDidMount() {
    let medicineType = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).drug_type;
    this.setState({medicineTypeSlug: medicineType}, () => this.fetchData());
  }

  componentDidUpdate(prevProps) {
    let medicineType = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).drug_type;
    let prevMedicineType = qs.parse(prevProps.location.search, {ignoreQueryPrefix: true}).drug_type;
    if (medicineType !== prevMedicineType) {
      this.fetchData();
    }
  }

  fetchData = (isPrev = false) => {
    const {medicineTypeSlug, currentPage} = this.state;
    let nextPage = currentPage;
    nextPage = (isPrev && currentPage > 1) ? currentPage - 1 : currentPage + 1;
    this.setState({isLoading: true});
    if (medicineTypeSlug) {
      this.props.history.push({
        search: `drug_type=${medicineTypeSlug}&page=${nextPage}`
      });
      MedicineApi.getMedicineType(medicineTypeSlug, nextPage)
        .then(result => {
          this.setState({
            isLoading: false,
            medicineList: result.medicines,
            totalPage: result.total_page,
            medicineTypeName: result.name,
            currentPage: nextPage
          });
        })
        .catch(error => {
          this.setState({isLoading: false, error: error});
        });
    } else {
      this.props.history.push({
        search: `page=${nextPage}`
      });
      MedicineApi.getMedicineList(nextPage)
        .then(result => {
          this.setState({
            isLoading: false,
            medicineList: result.medicines,
            totalPage: result.total,
            currentPage: nextPage
          });
        })
        .catch(error => {
          this.setState({isLoading: false, error: error});
        });
    }
  };

  handleMedicineListBreadcrumb = () => {
    this.setState({medicineTypeSlug: null, currentPage: 0}, () => this.fetchData());
  };


  render() {
    const {medicineTypeSlug, medicineTypeName, currentPage, isLoading, medicineList, totalPage} = this.state;
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
                  <Link to="/thuoc">Thuốc</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/thuoc/danh-sach" onClick={this.handleMedicineListBreadcrumb}>Danh sách thuốc</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1>
                {medicineTypeSlug ? medicineTypeName : 'Danh sách thuốc'}{' '}
                <span className="weak">{` - Trang ${currentPage}`}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="position" style={{paddingBottom: '3rem'}}>
          <div className="drug-list">
            <div className="content">
              <section>
                <Spin spinning={isLoading}>
                  <MedicineList medicineList={medicineList} />
                </Spin>
              </section>
            </div>
          </div>
        </div>
        <div className="pagination">
          <span className="step-links">
            {currentPage > 1 ?
              <div className="prev-page" onClick={() => this.fetchData(true)}>
                <i><FontAwesomeIcon icon="chevron-left" /></i>
                Trước
              </div>
              : null}
            <span className="current">
              {`Trang ${currentPage} / ${totalPage}  `}
            </span>
            {currentPage < totalPage ?
              <div className="next-page" onClick={() => this.fetchData()}>
                Sau
                <i><FontAwesomeIcon icon="chevron-right" /></i>
              </div>
              : null}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

MedicineListPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};


export default withRouter(MedicineListPage);