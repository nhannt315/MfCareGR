import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon } from 'antd';
import debounce from 'lodash.debounce';
import SuggestionBox from '../../SuggestionBox/SuggestionBox';

import './SearchBar.scss';

class SearchBar extends PureComponent {
  state = {
    query: ''
  };

  constructor(props) {
    super(props);
    this.debounceSearch = debounce(this.props.searchAll, 300);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.clearSearchResult();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  onInputChange = e => {
    this.setState({query: e.target.value});
    if(!e.target.value){
      this.props.clearSearchResult();
      return;
    }
    this.debounceSearch(e.target.value, 'navbar');
  };
  render() {
    const {searchLoading, searchMode, searchResult, clearSearchResult} = this.props;
    return (
      <Col xs={{span: 8}} lg={{span: 9}} className="no-paddings no-min-height search-area">
        <form className="search">
          <div className="search-container">
            <div className="inner">
              <button type="submit">
                <Icon type={searchLoading ? 'loading' : 'search'} />
              </button>
              <div className="has-suggestion">
                <input value={this.state.query}
                       onChange={this.onInputChange} type="text"
                       name="q" placeholder="Tìm kiếm..." autoComplete="off"
                />
                {searchResult && searchMode === 'navbar' ? (
                  <SuggestionBox result={searchResult} clearResult={clearSearchResult} />
                ): null}
              </div>
            </div>
          </div>
        </form>
      </Col>
    );
  }
}

SearchBar.propTypes = {
  searchAll: PropTypes.func,
  searchLoading: PropTypes.bool,
  searchError: PropTypes.object,
  searchResult: PropTypes.object,
  searchMode: PropTypes.string,
  clearSearchResult: PropTypes.func
};

export default SearchBar;