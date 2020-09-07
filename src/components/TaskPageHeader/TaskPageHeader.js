import React, { Component } from 'react';
import { Select, Tag, Input } from 'antd';
import 'antd/dist/antd.css';
import './taskPageHeader.css';

export default class TaskPageHeader extends Component {
  render() {
    const { isEdited, options } = this.props;


    return (
        <div className='task-page__header-block'>
          {/* <Select
            // mode="multiple"
            showArrow
            // tagRender={tagRender}
            defaultValue={['test']}
            style={{ width: '100px' }}
            options={opt}
          /> */}
          <Tag color={'green'} >{'task type'}</Tag>
          <Input 
            className='task-page__header'  
            defaultValue='Header'
            readOnly={isEdited ? false : true}
          />
        </div>
    )
  }
}
