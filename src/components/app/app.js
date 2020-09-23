import React, { Component } from 'react';
import './app.css';
import { Modal } from 'antd';
import TaskPage from '../TaskPage/TaskPage';
import MainTable from '../main-table/main-table';
import LocalStorageSettings from '../../service/LocalStorageSettings';

const localStorageSettings = new LocalStorageSettings();
localStorageSettings.init();

export default class App extends Component {
  state = {
    isTaskPageOpen: false,
    data: {},
  }

  openTaskPage = (data, updateTable) => {
    this.setState({
      isTaskPageOpen: true,
      data: data,
      updateTable: updateTable,
    })
  }

  closeTaskPage = () => {    
    this.setState({
      isTaskPageOpen: false,
      data: {},
    })
  }

  render() {
    const { isTaskPageOpen, data, updateTable } = this.state;

    return (
      <>
        <div className="todo-app">WOWWWW</div>
        <MainTable openTaskPage={this.openTaskPage} />
        <Modal
          className='task-page__content'
          wrapClassName='task-page__wrapper'
          style={{ padding:0 }}
          width={null}
          footer={null}
          centered
          destroyOnClose={true}
          maskClosable={false}
          visible={isTaskPageOpen}
          onCancel={this.closeTaskPage}
        >
          <TaskPage  
            closeTaskPage={this.closeTaskPage}
            data={data} 
            updateTable={updateTable}
          /> 
        </Modal>
      </>
    );
  }
}
