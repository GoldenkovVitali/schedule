import React, { Component } from 'react';
import Service from '../../service/Service'
import './app.css';
import TaskPage from '../TaskPage/TaskPage';
import UserSwitchButton from '../UserSwitchButton/UserSwitchButton';

export default class App extends Component {
  state = {
    data: [],
    showTaskPage: false,
  }
  
  service = new Service();

  async componentDidMount() {
    const res = await this.service.getAllEvents()
    this.setState({
        data: res,
    })
  }

  toggleTaskPage = () => {
    this.setState({showTaskPage: !this.state.showTaskPage})
  }

  render() {
    const { data, showTaskPage } = this.state;
    // const task = data.find(item => item.id === 'undefined')
    const task = data[0]

    console.log(data, task)
  
    return (
      <>
        <button onClick={this.toggleTaskPage}>show</button>
        <UserSwitchButton />
        {showTaskPage ? <TaskPage data={task} /> : null}
      </>
    );
  }
}
