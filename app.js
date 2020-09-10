import React, { Component } from 'react';
import Service from '../../service/Service'
import './app.css';

export default class App extends Component {
  state = {
    data: null,
  }

  service = new Service()
  async componentDidMount() {
  await this.service.postEvent({})
  const res = await this.service.getAllEvents()
  // const res = await this.service.getEvent({})
  this.setState({
      data: res,
  })
  //  res.forEach(element => this.service.deleteEvent(element.id))
  }

render() {
  console.log(this.state)
    return (
      <div className="todo-app">
   привет
      </div>
    );
  }
}
