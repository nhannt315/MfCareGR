import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';

import './MedicineDetail.scss';
import SameTypeMedList from '../../components/SameTypeMedList';
import MedicineService from '../../services/diseaseMedicineApi';

class MedicineDetail extends PureComponent {

  state = {
    slug: '',
    name: '',
    medicine: {},
    isLoading: false,
    medicineType: {},
    error: null,
    show: 'all',
    sameTypeMedList: [],
    sameTypeError: null,
    sameTypeLoading: false
  };

  componentDidMount() {
    this.setState({isLoading: true});
    let slug = this.props.match.params.slug;
    this.fetchData(slug);
  }

  componentDidUpdate() {
    this.setState({isLoading: true});
    let slug = this.props.match.params.slug;
    if (this.state.medicine.slug !== slug) {
      this.fetchData(slug);
    }
  }

  fetchData = (slug) => {
    MedicineService.getMedicineDetail(slug)
      .then(resp => {
        this.setState({
          slug: slug,
          name: resp.name,
          medicine: resp,
          medicineType: resp.medicine_type,
          isLoading: false
        });
      })
      .catch(error => this.setState({error: error, isLoading: false}));
    this.setState({sameTypeLoading: true});
    MedicineService.getSameTypeMedicine(slug)
      .then(resp => {
        this.setState({sameTypeMedList: resp, sameTypeLoading: false});
      })
      .catch(error => {
        this.setState({sameTypeError: error, sameTypeLoading: false});
      });
  };

  navLeftElementClicked = (type) => {
    this.setState({show: type});
  };

  render() {
    const {name, medicine, medicineType, show, sameTypeMedList, sameTypeError, sameTypeLoading} = this.state;
    let imageElement = null;
    if (medicine.image) {
      imageElement = (
        <section className="drug-image">
          <img src={medicine.image} alt={medicine.name} />
        </section>
      );
    }
    let medicineSummaryElement = medicine.overview ? parse(medicine.overview) : null;
    let instructionElement = medicine.instruction ? parse(medicine.instruction) : null;
    let infoElement = medicine.info ? parse(medicine.info) : null;
    let warningElement = medicine.warning ? parse(medicine.warning) : null;
    let contraindicationEle = medicine.contraindication ? parse(medicine.contraindication) : null;
    let sideEffectElement = medicine.side_effect ? parse(medicine.side_effect) : null;
    let noteElement = medicine.note ? parse(medicine.note) : null;
    let overdoseElement = medicine.overdose ? parse(medicine.overdose) : null;
    let preservationElement = medicine.preservation ? parse(medicine.preservation) : null;
    let interactionElement = medicine.interaction ? parse(medicine.interaction) : null;
    let showElement = null;
    switch (show) {
      case 'instruction':
        showElement = instructionElement;
        break;
      case 'info':
        showElement = infoElement;
        break;
      case 'warning':
        showElement = warningElement;
        break;
      case 'contraindication':
        showElement = contraindicationEle;
        break;
      case 'sideEffect':
        showElement = sideEffectElement;
        break;
      case 'note':
        showElement = noteElement;
        break;
      case 'overdose':
        showElement = overdoseElement;
        break;
      case 'preservation':
        showElement = preservationElement;
        break;
      case 'interaction':
        showElement = interactionElement;
        break;
      case 'all':
        showElement = (
          <React.Fragment>
            {instructionElement}
            {infoElement}
            {warningElement}
            {contraindicationEle}
            {sideEffectElement}
            {noteElement}
            {overdoseElement}
            {preservationElement}
            {interactionElement}
          </React.Fragment>
        );
        break;
      default:
        showElement = null;
    }
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
                  <Link to={`/thuoc/danh-sach/?drug_type=${medicineType.slug}`}>
                    {medicineType.name}
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1>
                {name}
              </h1>
            </div>
          </div>
        </div>
        <div id="drug-detail">
          <div className="position">
            <div className="content">
              <div className="drug-nav-left">
                <div className="option" onClick={() => this.navLeftElementClicked('all')}>
                  <i><FontAwesomeIcon icon="list-ul" /></i>
                  Hiển thị tất cả
                </div>
                <div className="option" onClick={() => this.navLeftElementClicked('instruction')}>
                  <i><FontAwesomeIcon icon="file" /></i>
                  Hướng dẫn sử dụng
                </div>
                <div className="option" onClick={() => this.navLeftElementClicked('info')}>
                  <i><FontAwesomeIcon icon="pencil-alt" /></i>
                  Thông tin dược chất
                </div>
                <div className="option" onClick={() => this.navLeftElementClicked('warning')}>
                  <i><FontAwesomeIcon icon="exclamation-triangle" /></i>
                  Cảnh báo
                </div>
                <div className="option" onClick={() => this.navLeftElementClicked('contraindication')}>
                  <i><FontAwesomeIcon icon="times" /></i>
                  Chống chỉ định
                </div>
                <div className="option" onClick={() => this.navLeftElementClicked('sideEffect')}>
                  <i><FontAwesomeIcon icon="meh" /></i>
                  Tác dụng phụ
                </div>
                <div className="option" onClick={() => this.navLeftElementClicked('note')}>
                  <i><FontAwesomeIcon icon="sticky-note" /></i>
                  Lưu ý
                </div>
                <div className="option" onClick={() => this.navLeftElementClicked('overdose')}>
                  <i><FontAwesomeIcon icon="frown" /></i>
                  Quá liều
                </div>
                <div className="option" onClick={() => this.navLeftElementClicked('preservation')}>
                  <i><FontAwesomeIcon icon="medkit" /></i>
                  Bảo quản
                </div>
                <div className="option" onClick={() => this.navLeftElementClicked('interaction')}>
                  <i><FontAwesomeIcon icon="magic" /></i>
                  Tương tác
                </div>
              </div>
              <div className="drug-body">
                {imageElement}
                {medicineSummaryElement}
                {showElement}
              </div>
            </div>
            <aside>
              <SameTypeMedList
                medicineList={sameTypeMedList}
                isLoading={sameTypeLoading}
                error={sameTypeError}
                medicineTypeSlug={this.state.medicineType.slug}
              />
            </aside>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

MedicineDetail.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};


export default withRouter(MedicineDetail);