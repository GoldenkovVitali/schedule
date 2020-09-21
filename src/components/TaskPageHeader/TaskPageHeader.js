import React, { Component } from 'react';
import { Select, Tag, Input, Divider } from 'antd';
import Button from '../Button/Button';
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import TaskTypeConstructor from '../TaskTypeConstructor/TaskTypeConstructor';
import LocalStorageSettings from '../../service/LocalStorageSettings';

import 'antd/dist/antd.css';
import './taskPageHeader.css';

export default class TaskPageHeader extends Component {
  state = {
    isTaskTypeConstructor: false,
    color: '',
  }

  localStorageSettings = new LocalStorageSettings();

  openTaskTypeConstructor = () => {
    this.setState({ isTaskTypeConstructor: true })
  }

  closeTaskTypeConstructor = () => {
    this.setState({ isTaskTypeConstructor: false })
  }

  render() {
    const { isEdited, handleChangeSelect, handleChangeInput, data, taskType, name, editBtnHandlerOnClick } = this.props;
    const { isTaskTypeConstructor } = this.state;

    const taskTypeColors = this.localStorageSettings.getTaskTypeColors();
    const taskTypes = this.localStorageSettings.getTaskTypes();    
    const taskTypesArr = Object.keys(taskTypes);
    
    const options = taskTypesArr.map((type) => {
      return { value: type, label: taskTypes[type] };
    })

    return (
      <>
        <div className='task-page__header-block'>
          <div className='task-page__tag'>
            { isEdited ?
              <Select
                value={[taskType]}
                style={{ width: '140px' }}
                options={options}
                onChange={handleChangeSelect}
                dropdownRender={menu => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '0' }} />
                    <div className='task-page__add-tag-wrap' >
                      <p
                        className='task-page__add-tag'                        
                        onClick={this.openTaskTypeConstructor}
                      >
                        <PlusOutlined className='task-page__plus-icon'/> 
                        Add item
                      </p>
                    </div>
                  </div>
                )}
              /> :
              <Tag color={taskTypeColors[data.type]} >
                {taskTypes[taskType]}
              </Tag>
            }
             <Button 
              title={isEdited ? 'Preview' : 'Edit'}
              shape='circle'
              type={'primary'}
              icon={isEdited ? <EyeOutlined /> : <EditOutlined />}
              btnClassName='task-page__preview-btn'
              btnWrapperClassName='task-page__preview-btn-wrapper'
              ghost={true}
              handlerOnClick={editBtnHandlerOnClick}
            />
          </div>
          
          <Input 
            className='task-page__header' 
            placeholder='Write task header...' 
            defaultValue={data[name]}
            value={data[name]}
            bordered={isEdited ? true : false}
            readOnly={isEdited ? false : true}
            data-name={name}
            onChange={handleChangeInput}
          />
        </div>
        <TaskTypeConstructor 
          visible={isTaskTypeConstructor}
          onCancel={this.closeTaskTypeConstructor}
        />
      </>
    )
  }
}
