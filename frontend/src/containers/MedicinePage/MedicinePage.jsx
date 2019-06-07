import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import Mansonry from 'react-masonry-component';

import medicineApi from '../../services/diseaseMedicineApi';
import './MedicinePage.scss';
import MedicineClass from '../../components/MedicineClass';

class MedicinePage extends PureComponent {

  state = {
    medicineClassList: [],
    isLoading: false,
    error: null
  };

  componentDidMount() {
    this.setState({isLoading: true});
    document.title = 'Thông tin tra cứu thuốc';
    medicineApi.getMedicineClasses()
      .then(resp => {
        this.setState({isLoading: false, medicineClassList: resp});
      })
      .catch(err => {
        this.setState({isLoading: false, error: err});
      });
  }

  render() {
    const {medicineClassList} = this.state;
    const medicineRenderList = medicineClassList.map(element => (
      <MedicineClass key={element.name} name={element.name} medicineTypes={element.types} />
    ));
    return (
      <React.Fragment>
        <div className="page-title">
          <div className="mask">
            <div className="position">
              <Breadcrumb style={{margin: '0 1.5rem'}}>
                <Breadcrumb.Item>
                  <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1>Danh sách các nhóm dược lý</h1>
            </div>
          </div>
        </div>
        <div className="landing-drugs">
          <div className="position">
            <div className="bg-landing">
              <div className="mask" />
              <p>Tra cứu các loại thuốc dễ dàng theo nhu cầu sử dụng của bạn và gia đình.</p>
            </div>
            <div className="landing-drugs-list">
              <Mansonry>
                {medicineRenderList}
              </Mansonry>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default MedicinePage;