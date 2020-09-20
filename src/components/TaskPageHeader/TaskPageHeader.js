import React, { Component } from 'react';
import { Select, Tag, Input } from 'antd';
import EventTypeColors from '../../configs/EventTypeColors';
import taskTypes from '../../configs/TaskTypes';
import Button from '../Button/Button';
import { EditOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './taskPageHeader.css';

export default class TaskPageHeader extends Component {

  render() {
    const { isEdited, handleChangeSelect, handleChangeInput, data, name, editBtnHandlerOnClick } = this.props;

    const taskTypesArr = Object.keys(taskTypes);
    
    const options = taskTypesArr.map((type) => {
      return { value: type, label: taskTypes[type] };
    })

    return (
        <div className='task-page__header-block'>
          <div className='task-page__tag'>
            { isEdited ?
              <Select
                defaultValue={[data.type]}
                style={{ width: '140px' }}
                options={options}
                onChange={handleChangeSelect}
              /> :
              <Tag color={EventTypeColors[data.type]} >
                {taskTypes[data.type]}
              </Tag>
            }
             <Button 
              shape='circle'
              type={'primary'}
              icon={isEdited ? <EyeOutlined /> : <EditOutlined />}
              btnClassName='task-page__preview-btn'
              btnWrapperClassName = 'task-page__preview-btn-wrapper'
              ghost={true}
              handlerOnClick={editBtnHandlerOnClick}
            />
          </div>
          
          <Input 
            className='task-page__header' 
            placeholder='Write task header...' 
            defaultValue={data[name]}
            value={data[name]}
            readOnly={isEdited ? false : true}
            data-name={name}
            onChange={handleChangeInput}
          />
        </div>
    )
  }
}
