import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';
import 'antd/dist/antd.css';
// import DescriptionBlock from '../DescriptionBlock/DescriptionBlock';
import './organizerBlock.css';


export default class OrganizerBlock extends Component { 

  render() {
    const { TextArea } = Input;

    return (
      <div className='organizer-block'>               
          <Checkbox className='organizer-block__checkbox' />
          <div className='organizer-block__data'>  
            <Input className='organizer-block__organizer' value='Write organizer...'/>
            <TextArea
              className='organizer-block__description'
              defaultValue='Write description...' 
              autoSize={{ minRows: 3, }}
            />
          </div>
      </div>
    )
  }
}