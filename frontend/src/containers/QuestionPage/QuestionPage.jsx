import React, { PureComponent } from 'react';
import { Row, Col, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuestionBox from '../../components/QuestionBox';
import './QuestionPage.scss';

class QuestionPage extends PureComponent {

  handleCreateSuccess = thread => {
    message.success('Câu hỏi của bạn đã được gửi thành công.\n' +
      'Bạn có thể kiểm tra và sửa lại nội dung câu hỏi nếu cần!');
    this.props.history.push(`/hoi-bac-si/${thread.slug}`);
  };


  render() {
    const {token} = this.props;
    return (
      <div className="bg-light-gray min-page-height clearfix">
        <div className="container m-t-sm">
          <Row>
            <Col md={{span: 16, offset: 4}}>
              <h4>Hỏi bác sĩ và cộng đồng MfCare</h4>
            </Col>
            <Col xs={24} md={{span: 16, offset: 4}} className="m-b-md no-paddings">
              <QuestionBox token={token} updateThreadList={this.handleCreateSuccess} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

QuestionPage.propTypes = {
  token: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  token: state.auth.tokenData,
  isAuthenticated: state.auth.isAuthenticated,
});


export default withRouter(
  connect(mapStateToProps, null)(
    QuestionPage
  )
);