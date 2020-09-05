import React, { Component } from 'react';
import Service from '../../service/Service'
import './app.css';

import Table from '../table-shedule/table';



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
    const {data} = this.state;
    console.log(data)
  
    return (
      <>
      <div className="todo-app">WOWWWW</div>
    <Table
    dataShedule={data}
      />

    </>
    );
  }
}
