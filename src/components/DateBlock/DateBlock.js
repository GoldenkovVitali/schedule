import React, { Component } from 'react';
import moment from 'moment';
import 'antd/dist/antd.css';
import { DatePicker, TimePicker, Checkbox } from 'antd';
import './dateBlock.css';

// TODO: DatePicker, TimePicker - bordered true - edite-mode, false - preview-mode

export default class DateBlock extends Component  {
  render() {    
    const timeFormat = 'HH:mm';

    return (
      <div className='date-block'>
        <div className='date-block__item' >
          <Checkbox className='date-block__checkbox'/>
          <p className='date-block__item-type'>Start:</p>
          <DatePicker bordered={true}/> 
        </div>
        <div className='date-block__item'>
          <Checkbox className='date-block__checkbox'/>
          <p className='date-block__item-type'>Time:</p>
          <TimePicker
            defaultValue={moment('00:00', timeFormat)}
            format={timeFormat}
            bordered={true} 
          />
        </div>
        <div className='date-block__item'>
          <Checkbox className='date-block__checkbox'/>
          <p className='date-block__item-type'>Deadline:</p>
          <DatePicker bordered={true} /> 
        </div>
      </div>
    )
  }
}