import React, { Component } from 'react';
import moment from 'moment';
import 'antd/dist/antd.css';
import { DatePicker, TimePicker, Checkbox } from 'antd';
import './dateBlock.css';

export default class DateBlock extends Component  {
  onChangeStartDate = (date, dateString) => {
    this.props.handleChangeDate(date, dateString, 'startDate');
  }

  onChangeStartTime = (date, dateString) => {
    this.props.handleChangeDate(date, dateString, 'startTime');
  }

  onChangeDeadline = (date, dateString) => {
    this.props.handleChangeDate(date, dateString, 'deadline');
  }

  // change = (value, mode) => {
  //   console.log(value, mode, 'vm')
  // }

  render() {    
    const timeFormat = 'HH:mm';
    const { isEdited, name: { startDate, startTime, deadline }, data, handleChangeStartDate, handleOnChangeStartTime, handleOnChangeDeadline } = this.props;

    console.log(startDate, startTime, deadline)

    const startTimeValue = data.startDate ? data.startDate : '00:00';

    return (
      <div className='date-block'>
        <div className='date-block__item' >
          <Checkbox className='date-block__checkbox'/>
          <p className='date-block__item-type'>Start: </p>
          <DatePicker 
            bordered={isEdited ? true : false}
            value={moment(data[startDate], 'YYYY-MM-DD')}
            data-name={startDate}
            onChange={handleChangeStartDate}
            disabled={isEdited ? false : true}
            suffixIcon={false}
          /> 
        </div>
        <div className='date-block__item'>
          <Checkbox className='date-block__checkbox'/>
          <p className='date-block__item-type'>Time: </p>
          <TimePicker
            defaultValue={moment(startTimeValue, timeFormat)}
            format={timeFormat}
            bordered={isEdited ? true : false} 
            data-name={startTime}
            onChange={handleOnChangeStartTime}            
            disabled={isEdited ? false : true}
            suffixIcon={false}
          />
        </div>
        <div className='date-block__item'>
          <Checkbox className='date-block__checkbox'/>
          <p className='date-block__item-type'>Deadline: </p>
          <DatePicker 
            bordered={isEdited ? true : false}
            value={data[deadline]}
            data-name={deadline} 
            onChange={handleOnChangeDeadline}
            disabled={isEdited ? false : true}
            suffixIcon={false}
          /> 
        </div>
      </div>
    )
  }
}