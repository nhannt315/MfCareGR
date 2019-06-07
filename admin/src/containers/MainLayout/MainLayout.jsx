import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, withRouter, Link, Switch } from 'react-router-dom';

import './MainLayout.less';
import * as Containers from '../index';

const {Header, Sider, Content} = Layout;

class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const {match} = this.props;
    const {collapsed} = this.state;
    return (
      <Layout id="main-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">{collapsed ? 'mf' : 'mfcare'}</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/quan-ly/bac-si">
                <Icon type="user" />
                <span>Bác sĩ</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/quan-ly/bai-viet">
                <Icon type="video-camera" />
                <span>Thu thập dữ liệu</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>Quản lý tag</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            <Switch>
              <Route exact path="/quan-ly/" component={Containers.DoctorPage} />
              <Route exact path="/quan-ly/bai-viet" component={Containers.ArticlePage} />
              <Route exact path="/quan-ly/bac-si/:id" component={Containers.DoctorDetail} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(MainLayout);