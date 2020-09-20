import React, { Component } from 'react';
import { Input, Modal } from 'antd';
import LocalStorageSettings from '../../service/LocalStorageSettings';

import './taskTypeConstructor.css';

export default class TaskTypeConstructor extends Component {
  state = {
    color: '#000000d9',
    tagName: '',
  }

  localStorageSettings = new LocalStorageSettings();

  changeTagName = (event) => {
    this.setState({ tagName: event.target.value });
  }

  changeTagColor = (event) => {
    this.setState({ color: event.target.value });
  }

  saveTaskType = () => {
    const { color, tagName } = this.state;
    const taskTypeName = tagName.match(/\w+/g).join('');

    this.localStorageSettings.addTaskType(taskTypeName, tagName);
    this.localStorageSettings.addTaskTypeColor(taskTypeName, color);

    this.props.onCancel();
  }

  render() {
    const { color, tagName } = this.state;
    const { visible, onCancel } = this.props;

    return (
      <Modal
        className=''
        wrapClassName=''
        style={{ padding: 0 }}
        width={300}
        centered
        destroyOnClose={true}
        visible={visible}
        onCancel={onCancel}
        onOk={this.saveTaskType}
      >
        <div className='task-type-constructor'>
          <div className='task-type-constructor__name-wrapper' >              
            <p>Write event type name</p>
            <Input 
              onChange={this.changeTagName} 
              value={tagName} 
            />
          </div>

          <div className='task-type-constructor__color-wrapper'>
            <p className='task-type-constructor__color-label'>
              Choose event type color
            </p>
            <Input 
              className='task-type-constructor__color'
              type="color"
              onChange={this.changeTagColor} 
              value={color} 
            />
          </div>
        </div>
      </Modal>
    )
  }
}