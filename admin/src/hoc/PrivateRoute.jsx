import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
  return <Route
    {...rest}
    render={
      props => {
        return isAuthenticated ?
          (
            <Component {...props} />
          )
          :
          (
            <Redirect
              to={{
                pathname: "/dang-nhap",
                state: {from: props.location}
              }}
            />
          )
      }
    }
  />
};
const mapStateToProps = state => (
  {
    isAuthenticated: state.auth.isAuthenticated
  }
);

export default withRouter(connect(
  mapStateToProps, null, null, {pure: false}
)(PrivateRoute));
