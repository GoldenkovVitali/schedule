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

  mockData = {
    comment: "string",
    commentsOn: false,
    dateTime: "string",
    deadline: "2020-09-24",
    description: "qwertyhujiokpiji",
    descriptionUrl: "https://www.youtube.com/watch?v=1ric9J-iYGM",
    descriptionUrlTitle: "dfghjk",
    id: "B3uw0EqwXlEEGnB4eCna",
    imageUrl: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    // key: "1",
    lat: "53.9083",
    lectureDescription: "wqrqwrtyujhg",
    lng: "27.5844",
    name: "tasl header",
    organizer: "vsdbsdfbs ",
    organizerDescription: "n v.asdnv↵↵↵sdvskladvasijvdsa",
    // place: "string",
    startDate: "2020-09-15",
    startTime: "03:00",
    timeZone: "string",
    type: "default",
    videoUrl: "https://www.youtube.com/watch?v=1ric9J-iYGM",
    zoom: "11.00",
  }

  mockData2 = {

  }

  render() {
    const { data, showTaskPage } = this.state;
    const task = data.find(item => item.id === 'y9oUy8UWY1k76NEr1wOa')
    // const task = data[0]

    // console.log(data, task)
  
    return (
      <>
        <button onClick={this.toggleTaskPage}>show</button>
        <UserSwitchButton />
        {showTaskPage ? <TaskPage data={task} /> : null}
      </>
    );
  }
}
