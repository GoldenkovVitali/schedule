import React, { Component } from 'react';
import './app.css';
import TaskPage from '../TaskPage/TaskPage';
import { Modal } from 'antd';

import MainTable from '../main-table/main-table';

export default class App extends Component {
  state = {
    isTaskPageOpen: false,
    data: {},
  }

  toggleTaskPage = (data) => {
    this.setState({
      isTaskPageOpen: !this.state.isTaskPageOpen,
      data: data,
    })
  }

  render() {
    const { isTaskPageOpen, data } = this.state;

    return (
      <>
        <div className="todo-app">WOWWWW</div>
        <MainTable toggleTaskPage={this.toggleTaskPage} />
         <Modal
          className='task-page__content'
          centered
          style={{ padding:0 }}
          wrapClassName='task-page__wrapper'
          width={null}
          footer={null}
          visible={isTaskPageOpen}
          onOk={this.toggleTaskPage}
          onCancel={this.toggleTaskPage}
        >
          <TaskPage  
            toggleTaskPage={this.toggleTaskPage} 
            data={data} 
          /> 
        </Modal>
      </>
    );
  }
}
