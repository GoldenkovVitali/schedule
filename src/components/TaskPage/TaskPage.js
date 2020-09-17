import React, { Component } from 'react';
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
import Button from '../Button/Button';
import TaskStructure from '../../configs/TaskStructure';
import { EditOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

import 'antd/dist/antd.css';
import './taskPage.css';

export default class TaskPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: { type: 'default' },
      isEdited: true,
    }
  }

  service = new Service();

  componentWillMount() {
    const { data } = this.props;
    const taskTypesArr = Object.keys(TaskStructure);
    let currentTaskType = taskTypesArr.find((type) => type === data.type);

    if (!currentTaskType) {
      currentTaskType = 'default';
    }

    this.setState((state) => state.data = data);
    this.setState((state) => {
      state.data.type = currentTaskType;
      state.isEdited = true;
    });
  }

  handleChangeSelect = (value) => {
    console.log(value);
    this.setState(({ data }) => data.type = value);
  }

  handleChangeInput = (event) => {
    const inputValue = event.target.value;
    const dataAttr = event.target.dataset.name;

    this.setState(({ data }) => data[dataAttr] = inputValue);
  }

  changeData = (key, value) => {
    this.setState(({ data }) => data[key] = value);
  }

  togglePageMode = () => {
    this.setState({ isEdited: !this.state.isEdited });
  }

  changeMapData = (lng, lat, zoom) => {
    this.setState(({ data }) => (
      data.lng = lng,
      data.lat = lat,
      data.zoom = zoom
    ));
  };

  postEvent = () => {
    this.service.postEvent(this.state.data)
  }

  updateEvent = () => {
    this.service.updateEvent(this.state.data.id, this.state.data)
  }

  getAllEvents = async () => {
    const ev = await this.service.getAllEvents();
    console.log(ev);
  }

  render() {
    const { isEdited, data } = this.state; 
    const { lng, lat, zoom } = data;   

    localStorage.data = this.props.data; 
    
    const longitude = !lng ? 27.56 : lng;
    const latitude = !lat ? 53.9 : lat;
    const zoomNew = !zoom ? 11 : zoom;    

    const { date, lectureDescription, image, video, link, taskDescription, map, organizer, organizerInfo, feedback } = TaskStructure[data.type];

    return (
      <div className="task-page">
          <Button 
            shape='circle'
            danger={true}
            type="dashed"
            icon={<CloseOutlined />}
            btnClassName='task-page__close-btn'
            btnWrapperClassName = 'task-page__close-btn-wrapper'
            handlerOnClick={null}
          />
          <Button 
            shape='circle'
            type={'primary'}
            icon={isEdited ? <EyeOutlined /> : <EditOutlined />}
            btnClassName='task-page__preview-btn'
            btnWrapperClassName = 'task-page__preview-btn-wrapper'
            ghost={true}
            handlerOnClick={this.togglePageMode}
          />
        <TaskPageHeader
          isEdited={isEdited}
          taskType={data.type}
          data={data}
          name="name"
          handleChangeSelect={this.handleChangeSelect}
          handleChangeInput={this.handleChangeInput}
        />
        <DateBlock
          isEdited={isEdited}
          name={{
            startDateName: 'startDate', 
            startTimeName: 'startTime', 
            deadlineName: 'deadline'
          }}
          date={date} 
          data={data}          
          changeData={this.changeData}
        />
        {lectureDescription 
          ? (
            <DescriptionBlock
              isEdited={isEdited}
              data={data}
              name="lectureDescription"
              handleChangeInput={this.handleChangeInput}
              changeData={this.changeData}
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
              changeData={this.changeData}
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
              changeData={this.changeData}
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
              changeData={this.changeData}
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
              changeData={this.changeData}
            />
          ) : null
        }
        {map
          ? (
            <MapBlock
              isEdited={isEdited}
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
              changeData={this.changeData}
            />
          ) : null
        }
        <CommentsBlock 
          data={data}
          feedback={feedback}
          isEdited={isEdited}
        />
        <Button 
          type='primary'
          size='default'
          btnClassName='task-page__confirm-btn'
          btnWrapperClassName = 'task-page__confirm-btn-wrapper'
          text='Confirm'
          handlerOnClick={this.updateEvent}
        />
      </div>
    );
  }
}
