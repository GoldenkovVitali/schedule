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
import LocalStorageSettings from '../../service/LocalStorageSettings';

import 'antd/dist/antd.css';
import './taskPage.css';

export default class TaskPage extends Component {
  state = {
    incomingData: this.props.data,
    data: JSON.parse(JSON.stringify(this.props.data)),
    isEdited: false,
  }

  service = new Service();
  localStorageSettings = new LocalStorageSettings();

  handleChangeSelect = (value) => {
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
    this.service.postEvent(this.state.data);
  }

  updateEvent = () => {
    this.props.updateRow(this.state.data); 
    this.props.closeTaskPage();
  }

  render() {
    const { isEdited, data, incomingData } = this.state; 
    const { lng, lat, zoom } = data;   

    const taskStructure = this.localStorageSettings.getTaskStructure();
    
    const longitude = !lng ? 27.56 : lng;
    const latitude = !lat ? 53.9 : lat;
    const zoomNew = !zoom ? 11 : zoom;    

    const dataType = taskStructure[data.type] ? data.type : 'default';

    const { date, lectureDescription, image, video, link, taskDescription, map, organizer, feedback } = taskStructure[dataType];

    return (
      <div className='task-page'>
        <TaskPageHeader
          isEdited={isEdited}
          taskType={dataType}
          data={data}
          name='name'
          handleChangeSelect={this.handleChangeSelect}
          handleChangeInput={this.handleChangeInput}
          editBtnHandlerOnClick={this.togglePageMode}
          changeData={this.changeData}
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
              name='lectureDescription'
              handleChangeInput={this.handleChangeInput}
              changeData={this.changeData}
            />
          ) : null
        }
        {image
          ? (
            <ImageBlock
              isEdited={isEdited}
              name='imageUrl'
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
              name='videoUrl'
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
              name='description'
              handleChangeInput={this.handleChangeInput}
              changeData={this.changeData}
            />
          ) : null
        }
        {map
          ? (
            <MapBlock
              isEdited={isEdited}
              name='place'
              data={data}
              lng={longitude}
              lat={latitude}
              zoom={zoomNew}
              changeMapData={this.changeMapData}
              handleChangeInput={this.handleChangeInput}
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
          data={incomingData}
          feedback={feedback}
          isEdited={isEdited}
        />
        {isEdited ? 
          <Button 
            type='primary'
            size='default'
            btnClassName='task-page__confirm-btn'
            btnWrapperClassName = 'task-page__confirm-btn-wrapper'
            text='Confirm'
            handlerOnClick={this.updateEvent}
          /> : 
          null 
        }
      </div>
    );
  }
}
