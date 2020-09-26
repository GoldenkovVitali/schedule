import React, { Component } from 'react';
import { Select, Tag, Input, Divider, Popconfirm } from 'antd';
import Button from '../Button/Button';
import { EditOutlined, EyeOutlined, PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import TaskTypeConstructor from '../TaskTypeConstructor/TaskTypeConstructor';
import LocalStorageSettings from '../../service/LocalStorageSettings';

import 'antd/dist/antd.css';
import './taskPageHeader.css';

export default class TaskPageHeader extends Component {
  state = {
    isTaskTypeConstructor: false,
    contructorEditeMode: false,
    color: '',
  }

  localStorageSettings = new LocalStorageSettings();

  openTaskTypeConstructor = () => {
    this.setState({ 
      isTaskTypeConstructor: true,
      constructorEditeMode: false,
    });
  }

  openEditeTaskTypeConstructor = () => {
    this.setState({ 
      isTaskTypeConstructor: true,
      constructorEditeMode: true, 
    });
  }

  closeTaskTypeConstructor = () => {
    this.setState({ isTaskTypeConstructor: false })
  }

  deleteTag = () => {
    const { taskType, changeData } = this.props;
    this.localStorageSettings.deleteTaskTypeSettings(taskType);
    changeData('taskType', 'default');
  }

  render() {
    const { isEdited, handleChangeSelect, handleChangeInput, data, taskType, name, editBtnHandlerOnClick, changeData } = this.props;
    const { isTaskTypeConstructor, constructorEditeMode } = this.state;

    const taskTypeColors = this.localStorageSettings.getTaskTypeColors();
    const taskTypes = this.localStorageSettings.getTaskTypes();    
    const taskTypesArr = Object.keys(taskTypes);
    
    const options = taskTypesArr.map((type) => {
      return { value: type, label: taskTypes[type]};
    })

    const localStorageData = JSON.parse(localStorage.currentState);
    const isMentor = localStorageData.isMentor === 'Ментор';

    return (
      <>
        <div className='task-page__header-block'>
          <div className='task-page__tag'>
            { isEdited ?
            <div className='task-page__select-wrap'>
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
              />                         
              <div className='task-page__option-item-btn-group'>
                <Button
                  type="text"
                  icon={<FormOutlined />}
                  btnClassName='task-page__option-item-btn'
                  onClick={this.openEditeTaskTypeConstructor}
                />
                <Popconfirm 
                  placement="bottom" 
                  title="Are you sure to delete this?"
                  onConfirm={this.deleteTag} 
                  okText="Yes" 
                  cancelText="No"
                >  
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    btnClassName='task-page__option-item-btn'
                    danger
                  />
                </Popconfirm>
              </div>
            </div>:
            <Tag color={taskTypeColors[data.type]} >
              {taskTypes[taskType]}
            </Tag>
          }
          {/* { isMentor ?  */}
            <Button 
              title={isEdited ? 'Preview' : 'Edit'}
              shape='circle'
              type={'primary'}
              icon={isEdited ? <EyeOutlined /> : <EditOutlined />}
              btnWrapperClassName='task-page__preview-btn-wrapper'
              btnClassName='task-page__preview-btn'
              ghost={true}
              onClick={editBtnHandlerOnClick}
            />
             {/* : */}
            {/* null          
          } */}
            
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
        {isTaskTypeConstructor ? 
        <TaskTypeConstructor 
          visible={isTaskTypeConstructor}
          onCancel={this.closeTaskTypeConstructor}
          handleChangeSelect={handleChangeSelect}
          destroyOnClose={true}
          constructorEditeMode={constructorEditeMode}
          taskType={constructorEditeMode ? taskType : null}
          tagName={constructorEditeMode ? taskTypes[taskType] : null}
        /> : null 
        }
      </>
    )
  }
}
