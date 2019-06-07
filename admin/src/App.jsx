import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Link, Switch } from 'react-router-dom';
import { BackTop, Layout, Drawer } from 'antd'
import PropTypes from 'prop-types';

import * as Containers from './containers';
import * as actions from './store/actions';
import PrivateRoute from './hoc/PrivateRoute';
import MainLayout from './containers/MainLayout/Loadable';

class App extends React.Component {

  componentDidMount() {
    this.props.tryAutoSignIn();
  }

  render() {
    const {isAuthenticated, isAdmin} = this.props;
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/dang-nhap" component={Containers.LoginPage} />
          <PrivateRoute path="/quan-ly" component={MainLayout} />
        </Switch>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.userData,
  token: state.auth.tokenData,
  isAdmin: state.auth.isAdmin
});

const mapDispatchToProps = dispatch => ({
  login: (email, password, remember) => dispatch(actions.login(email, password, remember)),
  logout: () => dispatch(actions.logout()),
  tryAutoSignIn: () => dispatch(actions.authCheckState())
});


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
