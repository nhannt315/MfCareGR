import React, { PureComponent } from 'react';
import {Icon} from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions';

import './HomePage.scss';
import SuggestionBox from '../../components/SuggestionBox';

class HomePage extends PureComponent {
  state = {
    query: ''
  }

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
    this.debounceSearch(e.target.value, 'homepage');
  }
  render() {
    const {searchLoading, searchMode, searchResult, clearSearchResult} = this.props;
    return (
      <div>
        <section className="area-background">
          <div className="container">
            <h2 className="text-center text-uppercase color-white area-title">Tất cả vì sức khỏe người việt</h2>
            <p className="text-center color-white area-sub-title"><em>
              Nền tảng y tế hàng đầu Việt Nam về thông tin khám chữa bệnh và chăm sóc sức khoẻ
            </em></p>

            <form className="search-home text-center">
              <div className="inner-home">
                <div className="has-suggestion-home">
                  <input 
                    value={this.state.query}
                    onChange={this.onInputChange}
                    type="text" 
                    placeholder="câu hỏi, bác sĩ, phòng khám, bệnh viện..."
                  />
                  {searchResult && searchMode === 'homepage' ? (
                    <SuggestionBox result={searchResult} clearResult={clearSearchResult} />
                  ) : null}
                </div>
                <button type="submit">
                  <Icon type={searchLoading ? 'loading' : 'search'} />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

HomePage.propTypes = {
  searchAll: PropTypes.func,
  clearSearchResult: PropTypes.func,
  searchLoading: PropTypes.bool,
  searchError: PropTypes.object,
  searchResult: PropTypes.object,
  searchMode: PropTypes.string
};

const mapStateToProps = state => {
  return {
    searchLoading: state.search.isLoading,
    searchResult: state.search.searchResult,
    searchError: state.search.error,
    searchMode: state.search.mode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: (query, mode) => dispatch(actions.searchAll(query, mode)),
    clearSearchResult: () => dispatch(actions.clearSearchResult())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
