import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Input, Modal, message } from 'antd';
import onClickOutside from 'react-onclickoutside';
import './EditableTagList.scss';
import EditableTag from './EditableTag';
import TagService from '../../services/tagService';
import ThreadService from '../../services/threadService';
import ResultBox from './ResultBox';

class EditableTagList extends PureComponent {
  state = {
    value: '',
    tagList: []
  };

  constructor(props) {
    super(props);
    this.debounceSearch = debounce(this.searchTag, 300);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.offEditMode();
    }
  };

  handleClickOutside = () => {
    this.props.offEditMode();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }


  showConfirm = (tag) => {
    Modal.confirm({
      title: `Bạn có chắc chắn muốn xóa chủ đề ${tag.name}`,
      content: 'Thao tác này sẽ không thế hoàn lại được',
      onOk: () => this.deleteTag(tag.id),
      onCancel: () => console.log('Cancel')
    });
  };

  deleteTag = (tagId) => {
    ThreadService.addRemoveTag('remove', this.props.threadId, tagId, this.props.token)
      .then(resp => {
        console.log(resp);
        this.props.updateTagThread(this.props.threadId, {id: tagId}, 'remove');
        this.props.offEditMode();
      })
      .catch(error => {
        console.log(error);
        message.error('Có lỗi hệ thống đã xảy ra, vui lòng thử lại sau!');
        this.props.offEditMode();
      });
  };

  addTag = (tag) => {
    ThreadService.addRemoveTag('add', this.props.threadId, tag.id, this.props.token)
      .then(resp => {
        console.log(resp);
        this.props.updateTagThread(this.props.threadId, tag, 'add');
        this.props.offEditMode();
      })
      .catch(error => {
        console.log(error);
        message.error('Có lỗi hệ thống đã xảy ra, vui lòng thử lại sau!');
        this.props.offEditMode();
      });
  };

  searchTag = (keyword) => {
    TagService.getTagList(keyword)
      .then(resp => {
        this.setState({tagList: resp});
      })
      .catch(error => console.log(error));
  };

  onInputChange = (e) => {
    this.setState({value: e.target.value});
    if (!e.target.value) {
      this.setState({tagList: []});
      return;
    }
    this.debounceSearch(e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <div className="tags" style={this.props.style}>
          Chủ đề:
          {this.props.tagList.map(tag => <EditableTag
            onClick={this.showConfirm} key={tag.id} tag={tag}
            mode="remove" />)
          }
        </div>
        <Input
          className="tag-input" placeholder="Gõ tìm chủ đề" onChange={this.onInputChange}
          value={this.state.value}
        />
        {this.state.tagList.length > 0 ? (
          <ResultBox tagList={this.state.tagList} addTag={this.addTag} />
        ) : null}
      </React.Fragment>
    );
  }
}

EditableTagList.propTypes = {
  threadId: PropTypes.number,
  tagList: PropTypes.array,
  token: PropTypes.string,
  updateTagThread: PropTypes.func,
  offEditMode: PropTypes.func
};

export default onClickOutside(EditableTagList);
