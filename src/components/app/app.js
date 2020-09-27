import React, { Component } from 'react';
import './app.css';
import { Modal } from 'antd';
import TaskPage from '../TaskPage/TaskPage';
import EditableTable from '../main-table/table-shedule/MentorTable';
import MainTable from '../main-table/main-table';
import LocalStorageSettings from '../../service/LocalStorageSettings';
import TableView from '../TableView';

const localStorageSettings = new LocalStorageSettings();
localStorageSettings.init();

export default class App extends Component {
  state = {
    isTaskPageOpen: false,
    confirmLoading: false,
    data: {},
    tableView: 'Table',
  };

  openTaskPage = (data, updateRow) => {
    this.setState({
      isTaskPageOpen: true,
      data: data,
      updateRow: updateRow,
    });
  };

  closeTaskPage = () => {
    this.setState({
      data: {},
    });
    setTimeout(() => {
      this.setState({
        isTaskPageOpen: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  onHandleView = value => {
    this.setState({
      tableView: value,
    });
  };

  render() {
    const { isTaskPageOpen, data, updateRow, confirmLoading } = this.state;

    return (
      <>
        <div className="todo-app" />
        <MainTable
          openTaskPage={this.openTaskPage}
          onHandleView={this.onHandleView}
          tableView={this.state.tableView}
        />
        <Modal
          className="task-page__content"
          wrapClassName="task-page__wrapper"
          style={{ padding: 0 }}
          width={null}
          footer={null}
          centered
          destroyOnClose={true}
          maskClosable={false}
          visible={isTaskPageOpen}
          confirmLoading={confirmLoading}
          onCancel={this.closeTaskPage}
        >
          <TaskPage
            closeTaskPage={this.closeTaskPage}
            data={data}
            updateRow={updateRow}
          />
        </Modal>
      </>
    );
  }
}
