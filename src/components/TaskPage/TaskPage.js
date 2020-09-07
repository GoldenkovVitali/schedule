import React, { Component } from 'react';
// import { Input, Checkbox, Image } from 'antd';
import 'antd/dist/antd.css';
import './taskPage.css';
import taskStructure from './taskStructureConfig';
import DateBlock from '../DateBlock/DateBlock';
import DescriptionBlock from '../DescriptionBlock/DescriptionBlock';
import ImageBlock from '../ImageBlock/ImageBlock';
import VideoBlock from '../VideoBlock/VideoBlock';
import OrganizerBlock from '../OrganizerBlock/OrganizerBlock';
import Link from '../Link/Link';
import TaskPageHeader from '../TaskPageHeader/TaskPageHeader'

export default class TaskPage extends Component {
  state = {
    isEdited: true,
  }

  togglePageMode = () => {
    this.setState({ isEdited: !this.state.isEdited })
  }
  // taskTypes = ['lecture', 'js_task']

  render() {
    const { isEdited } = this.state;

    return (
      <div className='task-page'>
        <button onClick={this.togglePageMode} style={{ position:"absolute", top: '10px'}}>change mode</button>

        <TaskPageHeader isEdited={isEdited} />
        <DateBlock isEdited={isEdited} />
        <DescriptionBlock isEdited={isEdited} />
        <ImageBlock isEdited={isEdited} />
        <VideoBlock isEdited={isEdited} />
        <Link isEdited={isEdited} />
        <DescriptionBlock isEdited={isEdited} />
        <OrganizerBlock isEdited={isEdited} />
      </div>
    )
  }
}