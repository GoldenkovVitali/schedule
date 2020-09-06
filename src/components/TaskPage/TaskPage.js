import React, { Component } from 'react';
import { Input, Checkbox, Image } from 'antd';
import 'antd/dist/antd.css';
import './taskPage.css';
import DateBlock from '../DateBlock/DateBlock';
import DescriptionBlock from '../DescriptionBlock/DescriptionBlock';
import ImageBlock from '../ImageBlock/ImageBlock';
import VideoBlock from '../VideoBlock/VideoBlock';
import OrganizerBlock from '../OrganizerBlock/OrganizerBlock';


export default class TaskPage extends Component {
  state = {
    isEdited: false,
  }

  render() {
    // console.log(this.props.data)
    const { TextArea } = Input;

    return (
      <div className='task-page'>

        <div className='task-page__header-block'>
          {/* <select className='task-page__type'>
            <option>type</option>
          </select> */}
          <input className='task-page__header' value='Header'/>
        </div>

        <DateBlock />
        <DescriptionBlock />
        <ImageBlock />
        <VideoBlock />
        <DescriptionBlock />
        <OrganizerBlock />



        

      </div>

    )
  }
}