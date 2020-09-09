import React, { Component } from 'react';
import { Select, Tag, Input } from 'antd';
import 'antd/dist/antd.css';
import './taskPageHeader.css';
import '../../configs/EventTypeColors';
import EventTypeColors from '../../configs/EventTypeColors';

export default class TaskPageHeader extends Component {
  taskTypes = {
    lectureOnline: 'online lecture',
    // lecture_offline: 'offline lecture',
    // lecture_mixed: 'mixed lecture',
    // lecture_self_study: 'self study',
    // warmup: 'warm-up',
    jsTask: 'js task',
    // kotlintask: 'kotlin task',
    // objctask: 'objc task',
    // htmltask: 'html task',
    // codejam: 'code jam',
    // externaltask: 'external task',
    // codewars: 'codewars',
    // selfeducation: 'self education',
    default: 'default',
  }


  render() {
    const { isEdited, handleChangeSelect, handleChangeInput, data, name } = this.props;

    const taskTypesArr = Object.keys(this.taskTypes);
    
    const options = taskTypesArr.map((type) => {
      return { value: type, label: this.taskTypes[type] };
    })

    console.log(data, 'select') //

    return (
        <div className='task-page__header-block'>
          { isEdited ?
            <Select
              defaultValue={[data.type]}
              style={{ width: '200px' }}
              options={options}
              onChange={handleChangeSelect}
            /> :
            <Tag color={EventTypeColors[data.type]} >
              {this.taskTypes[data.type]}
            </Tag>
          }
          <Input 
            className='task-page__header' 
            placeholder='Write task header...' 
            defaultValue={data.header}
            value={data.header}
            readOnly={isEdited ? false : true}
            data-name={name}
            onChange={handleChangeInput}
          />
        </div>
    )
  }
}
