import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './commentsBlock.css';
import { Comment, Avatar, Form, Button, List, Input, Checkbox } from 'antd';
// import moment from 'moment';
import Service from '../../service/Service';

const { TextArea } = Input;

const CommentList = ({ comments }) => {
  return <List
    className='comments-block'
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea autoSize={{ minRows: 5, }} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Send
      </Button>
    </Form.Item>
  </>
);

export default class CommentForm extends Component {
  state = {
    data: this.props.data,
    comments: [],
    submitting: false,
    value: '',
    checked: false,
  };
  data = this.props.data;
  id = this.props.data.id;

  service = new Service();

  componentDidMount() {
    const { data: { comments } } = this.props;

    if (!comments) {
      return;
    }

    comments.forEach((comment) => {
      this.setState((state) => {
        state.comments = [          
          ...this.state.comments,
          {
            author: comment.author,
            content: <p>{comment.content.props.children}</p>,
          },
        ];
      });
    })
  }  

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    const { user } = localStorage;

    this.setState({ submitting: true });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [          
          ...this.state.comments,
          {
            author: user,
            content: <p>{this.state.value}</p>,
          },
        ],
      });
      this.data.comments = this.state.comments;
      
      this.service.updateEvent(this.id, this.data);
    }, 100);
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onChangeCheckbox = (event) => {
    const isChecked = event.target.checked;

    this.data.commentsOn = isChecked;
    this.setState({
      checked: isChecked,
    })
  }

  render() {
    const { comments, submitting, value, checked } = this.state;
    const { isEdited } = this.props;

    return (
      <>
        { isEdited ? 
          <>
            <Checkbox 
              className='comments-block__checkbox' 
              onChange={this.onChangeCheckbox}
              checked={checked}
            /> 
            <span>Turn on comments</span>
          </>: null 
        }

        {this.data.commentsOn ?
          <div>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              content={
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </div> : null
        }
      </>
    );
  }
}
