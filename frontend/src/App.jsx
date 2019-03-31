import React, { PureComponent } from 'react';
import { Switch } from 'react-router';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import * as actions from './store/actions';
import * as Containers from './containers';
import './App.scss';

class App extends PureComponent {
  componentDidMount() {
    moment().locale('vi');
    this.props.tryAutoSignIn();
    String.prototype.trunc =
      String.prototype.trunc ||
      function(n) {
        return this.length > n ? this.substr(0, n - 1) + '...' : this;
      };
  }

  render() {
    const {
      logout,
      isAuthenticated,
      userData,
      searchAll,
      searchError,
      searchLoading,
      searchResult,
      searchMode,
      clearSearchResult
    } = this.props;
    return (
      <div className="App">
        <Navbar
          logout={logout}
          userData={userData}
          isAuthenticated={isAuthenticated}
          searchAll={searchAll}
          searchLoading={searchLoading}
          searchMode={searchMode}
          searchError={searchError}
          searchResult={searchResult}
          clearSearchResult={clearSearchResult}
        />
        <div className="main">
          <Switch>
            <Route exact path="/" render={() => <Containers.HomePage />} />
            <Route exact path="/tra-cuu" render={() => <Containers.LookUp />} />
            <Route
              exact
              path="/thuoc"
              render={() => <Containers.MedicinePage />}
            />
            <Route
              exact
              path="/thuoc/danh-sach"
              render={() => <Containers.MedicineListPage />}
            />
            <Route
              exact
              path="/benh/"
              render={() => <Containers.DiseasePage />}
            />
            <Route
              exact
              path="/thuoc/:slug"
              render={() => <Containers.MedicineDetailPage />}
            />
            <Route
              exact
              path="/benh/:slug"
              render={() => <Containers.DiseaseDetailPage />}
            />
            <Route
              exact
              path="/hoi-bac-si"
              render={() => <Containers.AskDoctor />}
            />
            <Route
              exact
              path="/bai-viet/:slug"
              render={() => <Containers.ArticleDetailPage />}
            />
            <Route
              exact
              path="/dang-nhap"
              render={() => <Containers.LoginPage />}
            />
            <Route
              exact
              path="/dang-ky"
              render={() => <Containers.RegisterPage />}
            />
            <Route
              exact
              path="/bac-si"
              render={() => <Containers.DoctorListPage />}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  logout: PropTypes.func,
  tryAutoSignIn: PropTypes.func,
  userData: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  searchAll: PropTypes.func,
  clearSearchResult: PropTypes.func,
  searchLoading: PropTypes.bool,
  searchError: PropTypes.object,
  searchResult: PropTypes.object,
  searchMode: PropTypes.string
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData,
    searchLoading: state.search.isLoading,
    searchResult: state.search.searchResult,
    searchError: state.search.error,
    searchMode: state.search.mode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    tryAutoSignIn: () => dispatch(actions.authCheckState()),
    searchAll: (query, mode) => dispatch(actions.searchAll(query, mode)),
    clearSearchResult: () => dispatch(actions.clearSearchResult())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
