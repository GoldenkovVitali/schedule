import React, { Component } from 'react';
import Service from '../../service/Service';
import './app.css';
import TaskPage from '../TaskPage/TaskPage';
import UserSwitchButton from '../UserSwitchButton/UserSwitchButton';
import EditableTable from '../main-table/table-shedule/MentorTable'

import MainTable from '../main-table/main-table';

export default class App extends Component {
  render() {
    return (
      <>
        <div className="todo-app">WOWWWW</div>
        <MainTable />
      </>
    );
  }
}
