import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';


class Footer extends PureComponent {
  render() {
    return (
      <footer>
        <div className="lower">
          <div className="container-fluid" style={{paddingBottom: '2rem'}}>
            <ul className="site-links list-unstyled">
              <li>
                <p>Danh mục</p>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Danh sách bác sĩ</Link>
                  </li>
                  <li>
                    <Link to="/">Danh sách chuyên khoa</Link>
                  </li>
                  <li>
                    <Link to="/">Danh sách dịch vụ</Link>
                  </li>
                  <li>
                    <Link to="/">Danh sách bài viết</Link>
                  </li>
                </ul>
              </li>
              <li>
                <p>Hỏi bác sĩ</p>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Chuyên mục Hỏi bác sĩ</Link>
                  </li>
                  <li>
                    <Link to="/">Gửi câu hỏi</Link>
                  </li>
                  <li>
                    <Link to="/">Câu hỏi đã được bác sĩ trả lời </Link>
                  </li>
                </ul>
                <p>Tra cứu</p>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Tra cứu bệnh</Link>
                  </li>
                  <li>
                    <Link to="/">Tra cứu thuốc</Link>
                  </li>
                </ul>
              </li>
              <li>
                <p>Tài khoản</p>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Đăng ký</Link>
                  </li>
                  <li>
                    <Link to="/">Đăng ký bác sĩ</Link>
                  </li>
                  <li>
                    <Link to="/">Đăng nhập</Link>
                  </li>
                  <li>
                    <Link to="/">Khôi phục mật khẩu</Link>
                  </li>
                </ul>
              </li>
              <li>
                <p>Mfcare</p>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Về chúng tôi</Link>
                  </li>
                  <li>
                    <Link to="/">Liên hệ</Link>
                  </li>
                  <li>
                    <Link to="/">Điều khoản sử dụng</Link>
                  </li>
                  <li>
                    <Link to="/">Chính sách bảo mật thông tin</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="disclaimer">
          <p>
            Trang web này được sở hữu và quản lý bởi: <strong>Công ty Cổ phần Mfcare</strong>. Trụ sở chính: 300 Đê La
            Thành, phường Thổ Quan, quận Đống Đa, Hà Nội, Việt Nam.
          </p>
          <p>Giấy chứng nhận đăng ký kinh doanh số <strong className="registration-number">0313566851</strong> do Sở Kế
            hoạch và Đầu tư TP Hồ Chí Minh cấp ngày 07/12/2015.</p>
          <p>Các thông tin trên trang web này chỉ mang tính chất tham khảo. Chúng tôi không chịu trách nhiệm nào do việc
            áp dụng các thông tin trên trang web này gây ra.</p>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};

export default Footer;