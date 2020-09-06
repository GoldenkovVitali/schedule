import React, { Component } from 'react';
import Service from '../../service/Service'
import './app.css';
import TableControls from "../TableControls";

export default class App extends Component {
  state = {
    data: null,
  }

  service = new Service();

  async componentDidMount() {
    const res = await this.service.getAllEvents()
    this.setState({
        data: res,
    })
}

  render() {
    console.log(this.state)

    return (
      <div className="todo-app">
      <TableControls />
      </div>
    );
  }
}
