import React, { Component } from 'react';
import { Select, Tag, Input } from 'antd';
import 'antd/dist/antd.css';
import './taskPageHeader.css';

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
    const { isEdited, options, handleChangeSelect } = this.props;

    const taskTypesArr = Object.keys(this.taskTypes);
    
    const opt = taskTypesArr.map((type) => {
      return {value: type, label: this.taskTypes[type]};
    })
    
    // [{value: 'test', label: 'testLabel'}, {value: 'test1', label: 'test1Label'}]


    return (
        <div className='task-page__header-block'>
          { isEdited ?
            <Select
              defaultValue={['test']}
              style={{ width: '100px' }}
              options={opt}
              onChange={handleChangeSelect}
            /> :
            <Tag color={'green'} >
              {'task type'}
            </Tag>
          }
          <Input 
            className='task-page__header'  
            defaultValue='Header'
            readOnly={isEdited ? false : true}
          />
        </div>
    )
  }
}
