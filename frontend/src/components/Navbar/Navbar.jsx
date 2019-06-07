import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';
import NavbarHeader from './NavbarHeader';

class Navbar extends PureComponent {
  render() {
    const {
      logout,
      userData,
      isAuthenticated,
      searchAll,
      searchError,
      searchLoading,
      searchResult,
      searchMode,
      clearSearchResult,
      token
    } = this.props;
    return (
      <header>
        <NavbarHeader
          isAuthenticated={isAuthenticated}
          logout={logout}
          userData={userData}
          token={token}
          searchAll={searchAll}
          searchLoading={searchLoading}
          searchMode={searchMode}
          searchError={searchError}
          searchResult={searchResult}
          clearSearchResult={clearSearchResult}
        />
      </header>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func,
  userData: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  token: PropTypes.string,
  searchAll: PropTypes.func,
  clearSearchResult: PropTypes.func,
  searchLoading: PropTypes.bool,
  searchError: PropTypes.object,
  searchResult: PropTypes.object,
  searchMode: PropTypes.string
};

export default Navbar;
