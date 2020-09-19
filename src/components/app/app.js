import React, { Component } from 'react';
import Service from '../../service/Service';
import './app.css';
import TaskPage from '../TaskPage/TaskPage';
import UserSwitchButton from '../UserSwitchButton/UserSwitchButton';

import MainTable from '../main-table/main-table';
import Calendar from '../Calendar/calendar';

export default class App extends Component {
  render() {
    return (
      <>
        <div className="todo-app">WOWWWW</div>
        {/*<MainTable/> */}
        <Calendar />
      </>
    );
  }
}
