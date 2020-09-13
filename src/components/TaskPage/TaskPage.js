/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
// import { Input, Checkbox, Image } from 'antd';
import 'antd/dist/antd.css';
import './taskPage.css';
import taskStructure from '../../configs/taskStructure';
import DateBlock from '../DateBlock/DateBlock';
import DescriptionBlock from '../DescriptionBlock/DescriptionBlock';
import ImageBlock from '../ImageBlock/ImageBlock';
import VideoBlock from '../VideoBlock/VideoBlock';
import OrganizerBlock from '../OrganizerBlock/OrganizerBlock';
import MapBlock from '../MapBlock/MapBlock';
import Link from '../Link/Link';
import TaskPageHeader from '../TaskPageHeader/TaskPageHeader';
import Service from '../../service/Service';
import CommentsBlock from '../../components/CommentsBlock/CommentsBlock';

export default class TaskPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: this.props.data || {
        type: 'default',
      },
      isEdited: true,
      currentTaskType: 'default',
    }
  }

  taskTypes = {
    lectureOnline: 'online lecture',
    // lecture_offline: 'offline lecture',
    // lecture_mixed: 'mixed lecture',
    // lecture_self_study: 'self study',
    // warmup: 'warm-up',
    jsTask: 'js task',
    // kotlintask: 'kotlin task',
    // objctask: 'objc task',
    // htmltask: 'html task',
    // codejam: 'code jam',
    // externaltask: 'external task',
    // codewars: 'codewars',
    // selfeducation: 'self education',
    default: 'default',
  }

  service = new Service();

  // componentDidMount() {

  //   const data = this.props.data
  //   console.log(this.props.data)
  //   this.setState({data: data})
  // }

  handleChangeSelect = (value) => {
    console.log(value);
    this.setState(({ data }) => data.type = value);
  }

  handleChangeInput = (event) => {
    const inputValue = event.target.value;
    const dataAttr = event.target.dataset.name;
    console.log(dataAttr); //

    this.setState(({ data }) => data[dataAttr] = inputValue);
  }

  handleChangeStartDate = (date, dateString) => {
    // const inputValue =  dateString;
    // const dataAttr = event.target.dataset.name;
    console.log(dateString) //
    this.setState(({ data }) => data.startDate = dateString );
  }

  handleChangeStartTime = (date, dateString) => {
    this.setState(({ data }) => data.startTime = dateString );
  }

  handleChangeDeadline = (date, dateString) => {
    this.setState(({ data }) => data.deadline = dateString );
  }


  togglePageMode = () => {
    this.setState({ isEdited: !this.state.isEdited });
  }

  changeMapData = (lng, lat, zoom) => {
    this.setState(({ data }) => (data.lng = lng,
    data.lat = lat,
    data.zoom = zoom));
  };

  postEvent = () => {
    // console.log(this.state.data)
    this.service.postEvent(this.state.data)
  }

  // getEvent = async () => {
  //   const ev = await this.service.getEvent('o2qlUYHL9CCv3DUKB84z')
  //   console.log(ev)
  // }

  getAllEvents = async () => {
    const ev = await this.service.getAllEvents();
    console.log(ev);
  }


  render() {
    const { isEdited, data } = this.state; 
    const { lng, lat, zoom } = data;   

    console.log(data, 'state')

    const taskStructureKeys = Object.keys(taskStructure);
    const currentTaskType = taskStructureKeys.find((key) => key === data.type)
    if (!currentTaskType) {
      data.type = 'default';
    }
    
    const longitude = !lng ? 27.56 : lng;
    const latitude = !lat ? 53.9 : lat;
    const zoomNew = !zoom ? 11 : zoom;    

    const { date, lectureDescription, image, video, link, taskDescription, map, organizer, organizerInfo, feedback } = taskStructure[data.type];

    // const id = "o2qlUYHL9CCv3DUKB84z"

    return (
      <div className="task-page">
        <button onClick={this.togglePageMode} style={{ position: 'absolute', top: '10px' }}>change mode</button>

        <TaskPageHeader
          isEdited={isEdited}
          // taskType={currentTaskType}
          taskType={data.type}
          data={data}
          name="name"
          handleChangeSelect={this.handleChangeSelect}
          handleChangeInput={this.handleChangeInput}
        />
        <DateBlock
          isEdited={isEdited}
          name={{
            startDate: 'startDate', 
            startTime: 'startTime', 
            deadline: 'deadline'
          }}
          date={date} 
          data={data}          
          handleChangeStartDate={this.handleChangeStartDate}
          handleOnChangeStartTime={this.handleChangeStartTime}
          handleOnChangeDeadline={this.handleChangeDeadline}
        />
        {lectureDescription
          ? (
            <DescriptionBlock
              isEdited={isEdited}
              data={data}
              name="lectureDescription"
              handleChangeInput={this.handleChangeInput}
            />
          ) : null
        }
        {image
          ? (
            <ImageBlock
              isEdited={isEdited}
              name="imageUrl"
              data={data}
              handleChangeInput={this.handleChangeInput}
            />
          ) : null
        }
        {video
          ? (
            <VideoBlock
              isEdited={isEdited}
              name="videoUrl"
              data={data}
              handleChangeInput={this.handleChangeInput}
            />
          ) : null
        }
        {link
          ? (
            <Link
              isEdited={isEdited}
              name={{
                link: 'descriptionUrl',
                linkTitle: 'descriptionUrlTitle',
              }}
              data={data}
              handleChangeInput={this.handleChangeInput}
            />
          ) : null
        }
        {taskDescription
          ? (
            <DescriptionBlock
              isEdited={isEdited}
              data={data}
              name="description"
              handleChangeInput={this.handleChangeInput}
            />
          ) : null
        }
        {map
          ? (
            <MapBlock
              lng={longitude}
              lat={latitude}
              zoom={zoomNew}
              changeMapData={this.changeMapData}
            />
          ) : null
        }
        {organizer
          ? (
            <OrganizerBlock
              isEdited={isEdited}
              data={data}
              name={{
                organizer: 'organizer',
                organizerDescription: 'organizerDescription',
              }}
              handleChangeInput={this.handleChangeInput}
            />
          ) : null
        }
        <CommentsBlock 
          data={data}
          feedback={feedback}
          isEdited={isEdited}
        />

        <div>
          <button
            onClick={this.postEvent}
          >POST
          </button>
          <button
            onClick={this.getEvent}
          >GET
          </button>
          <button
            onClick={this.getAllEvents}
          >GET ALL
          </button>
          <button>UPDATE</button>
          <button>DELETE</button>
        </div>
      </div>
    );
  }
}
