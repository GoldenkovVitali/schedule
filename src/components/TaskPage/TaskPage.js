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
import TaskPageHeader from '../TaskPageHeader/TaskPageHeader';

export default class TaskPage extends Component {
  state = {
    isEdited: true,
    currentTaskType: 'default',
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

  handleChangeSelect = (value) => {
    console.log(value)
    this.setState({ currentTaskType: value });
  }

  togglePageMode = () => {
    this.setState({ isEdited: !this.state.isEdited })
  }

  render() {
    const { data } = this.props;
    const { isEdited, currentTaskType } = this.state;

    const { type, header, date, lectionDescription, image, video, link, taskDescription, map, organizer,organizerInfo, feedback } = taskStructure[currentTaskType];

    console.log(data)

    return (
      <div className='task-page'>
        <button onClick={this.togglePageMode} style={{ position:"absolute", top: '10px'}}>change mode</button>

        <TaskPageHeader 
          isEdited={isEdited}
          taskType={currentTaskType}
          data={data}
          handleChangeSelect={this.handleChangeSelect}
        />
        <DateBlock 
          isEdited={isEdited}
          date={date} 
          data={data}
        />
        { lectionDescription ? 
          <DescriptionBlock 
            isEdited={isEdited} 
            data={data}
          /> : null 
        }
        { image ? 
          <ImageBlock 
            isEdited={isEdited} 
            data={data}
          /> : null 
        }
        { video ? 
          <VideoBlock 
            isEdited={isEdited} 
            data={data}
          /> : null 
        }
        { link ? 
          <Link 
            isEdited={isEdited} 
            data={data}
          /> : null 
        }
        { taskDescription ? 
          <DescriptionBlock 
            isEdited={isEdited} 
            data={data}
          /> : null 
        }
        { organizer ? 
          <OrganizerBlock 
            isEdited={isEdited} 
            data={data}
          /> : null 
        }
      </div>
    )
  }
}