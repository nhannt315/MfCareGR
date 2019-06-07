import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon, message, notification } from 'antd';
import debounce from 'lodash.debounce';

import TagService from '../../services/tagService';
import TagList from './TagList';
import Tag from './Tag';
import './TagManager.scss';

class TagManager extends PureComponent {

  state = {
    keyword: '',
    tagList: [],
    listLoading: false
  };

  componentDidMount() {
    this.props.getTagList();
  }

  constructor(props) {
    super(props);
    this.debounceSearch = debounce(this.searchTag, 300);
  }


  searchTag = (keyword) => {
    this.setState({listLoading: true});
    TagService.searchTag(keyword)
      .then(resp => {
        this.setState({tagList: resp, listLoading: false});
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
        this.setState({listLoading: false});
      });
  };

  addRemoveUserTag = (tagId, isAdd, tagName) => {
    if (isAdd) {
      TagService.addUserTag(tagId, this.props.token)
        .then(() => {
          this.props.addRemoveUserTag(tagId, 'add');
          this.props.getTagList();
          this.setState({tagList: []});
        })
        .catch(() => message.error('Đã có lỗi xảy ra!'));
    } else {
      TagService.removeUserTag(tagId, this.props.token)
        .then(() => {
          this.props.addRemoveUserTag(tagId, 'remove');
          this.props.getTagList();
          notification.open({
            message: 'Thông báo',
            description: `Bạn đã xóa chủ đề ${tagName}`,
            duration: 2
          });
        })
        .catch(() => message.error('Đã có lỗi xảy ra!'));
    }
  };

  onInputChange = (e) => {
    this.setState({keyword: e.target.value});
    if (!e.target.value) {
      this.setState({tagList: []});
      return;
    }
    this.debounceSearch(e.target.value);
  };

  handleClickOutside = () => {
    this.props.closeTagManager();
  };

  render() {
    const {listLoading, tagList} = this.state;
    const {userData, userTags} = this.props;
    return (
      <div id="tag-manager-modal" className="tag-manager-modal">
        <div className="tag-manager-sticky">
          <div className="tag-manager-modal-content">
            <div className="search p-w-xl">
              <span id="icon-search"><Icon type={listLoading ? 'loading' : 'search'} /></span>
              <input
                type="text" placeholder="Gõ để tìm thêm chủ đề..." value={this.state.keyword}
                onChange={this.onInputChange} />
              <span id="icon-close" onClick={() => this.setState({tagList: []})}><Icon type="close" /></span>
            </div>
            <div style={{display: `${tagList.length > 0 ? 'none' : 'block'}`}}>
              <div className="panel-heading p-sm">
                <div>Các chủ đề bạn chọn sẽ được thêm vào danh sách đang theo dõi</div>
                <p className="p-t-sm">Đang theo dõi ({userData.tags.length || 0})</p>
              </div>
              <div className="tag-content p-sm">
                <ul className="list-inline no-margins">
                  {userTags.map(tag => (
                    <Tag key={tag.id} following tag={tag} addRemoveTag={this.addRemoveUserTag} />
                  ))}
                </ul>
              </div>
            </div>
            {tagList.length > 0 &&
            <TagList tagList={tagList} userTagList={userData.tags} addRemoveTag={this.addRemoveUserTag} />}
            <div className="footer-button panel-heading text-center p-sm">
              <div className="btn btn-md" onClick={this.props.closeTagManager}>
                Xong
                <i><FontAwesomeIcon icon="check" /></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TagManager.propTypes = {
  token: PropTypes.string,
  userData: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  closeTagManager: PropTypes.func,
  addRemoveUserTag: PropTypes.func,
  getTagList: PropTypes.func,
  userTags: PropTypes.array
};

export default onClickOutside(TagManager);
