import React, { Component } from 'react';
import { Select, Tag, Input } from 'antd';
import EventTypeColors from '../../configs/EventTypeColors';
import taskTypes from '../../configs/TaskTypes';

import 'antd/dist/antd.css';
import './taskPageHeader.css';

export default class TaskPageHeader extends Component {

  render() {
    const { isEdited, handleChangeSelect, handleChangeInput, data, name } = this.props;

    const taskTypesArr = Object.keys(taskTypes);
    
    const options = taskTypesArr.map((type) => {
      return { value: type, label: taskTypes[type] };
    })

    return (
        <div className='task-page__header-block'>
          { isEdited ?
            <Select
              defaultValue={[data.type]}
              style={{ width: '180px' }}
              options={options}
              onChange={handleChangeSelect}
            /> :
            <Tag color={EventTypeColors[data.type]} >
              {taskTypes[data.type]}
            </Tag>
          }
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
