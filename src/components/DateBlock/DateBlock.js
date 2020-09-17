import React, { Component } from 'react';
import moment from 'moment';
import { DatePicker, TimePicker, Checkbox } from 'antd';
import { ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './dateBlock.css';

export default class DateBlock extends Component  {

  componentWillMount() {
    const { data, name: { startDateName, startTimeName, deadlineName } } = this.props;
    this.setState({ 
      checked: {
        startDate: !!data[startDateName], 
        startTime: !!data[startTimeName], 
        deadline: !!data[deadlineName],
      },
      startDate: data[startDateName] ? data[startDateName] : '2020-09-01',
      startTime: data[startTimeName] ? data[startTimeName] : '00:00',
      deadline: data[deadlineName] ? data[deadlineName] : '2020-09-01',
    })
  }

  handleChangeStartDate = (date, dateString) => {
    const { changeData } = this.props;
    this.setState((state) => state.startDate = dateString );
    changeData('startDate', dateString);
  }

  handleChangeStartTime = (date, dateString) => {
    const { changeData } = this.props;
    this.setState((state) => state.startTime = dateString );
    changeData('startTime', dateString);
  }

  handleChangeDeadline = (date, dateString) => {
    const { changeData } = this.props;
    this.setState((state) => state.deadline = dateString );
    changeData('deadline', dateString);
  }

  onChangeCheckbox = (event) => {
    const { changeData } = this.props;
    const dataAttr = event.target['data-name'];
    const isChecked = event.target.checked;

    if (!isChecked) {
      changeData(dataAttr, '');
    } else {
      changeData(dataAttr, this.state[dataAttr]);
    }

    this.setState(({checked}) => checked[dataAttr] = isChecked );    
  }

  render() {    
    const { isEdited, name: { startDateName, startTimeName, deadlineName }, data, date: { isStartDate, isStartTime, isDeadlineDate } } = this.props;

    const { startTime, startDate, deadline, checked } = this.state;
    
    const timeFormat = 'HH:mm';
    const dateFormat = 'YYYY-MM-DD';

    return (
      <div className='date-block'>
        {isStartDate ?
          <div className='date-block__item' >
            {isEdited ? 
              <Checkbox 
                className='date-block__checkbox' 
                data-name={startDateName}
                checked={checked[startDateName]}
                onChange={this.onChangeCheckbox}
              /> : null 
            }
            {(!isEdited && !checked[startDateName]) ? null : (            
              <>
                <p className='date-block__item-type'>Start: </p>
                <DatePicker 
                  bordered={isEdited ? true : false}
                  value={moment(startDate, dateFormat)}
                  data-name={startDateName}
                  onChange={this.handleChangeStartDate}
                  disabled={(isEdited && checked[startDateName]) ? false : true}
                  suffixIcon={isEdited ? <CalendarOutlined /> : null}
                /> 
              </>
            )}
          </div> : null
        }
        {isStartTime ?
          <div className='date-block__item'>
            {isEdited ? 
              <Checkbox  
                className='date-block__checkbox'
                data-name={startTimeName}
                checked={checked[startTimeName]}
                onChange={this.onChangeCheckbox}
              /> : null 
            }
            {(!isEdited && !checked[startTimeName]) ? null : ( 
              <>
                <p className='date-block__item-type'>Time: </p>
                <TimePicker
                  defaultValue={moment(startTime, timeFormat)}
                  format={timeFormat}
                  bordered={isEdited ? true : false} 
                  data-name={startTimeName}
                  onChange={this.handleChangeStartTime}            
                  disabled={(isEdited && checked[startTimeName]) ? false : true}
                  suffixIcon={isEdited ? <ClockCircleOutlined /> : null}
                /> 
              </> 
            )}
          </div> : null
        }
        {isDeadlineDate ? 
          <div className='date-block__item'>
            {isEdited ? 
              <Checkbox 
                className='date-block__checkbox' 
                data-name={deadlineName} 
                checked={checked[deadlineName]}
                onChange={this.onChangeCheckbox}
              /> : null 
            }
            {(!isEdited && !checked[startTimeName]) ? null : ( 
              <>
                <p className='date-block__item-type'>Deadline: </p>             
                <DatePicker 
                  bordered={isEdited ? true : false}
                  value={moment(deadline, dateFormat)}
                  data-name={deadlineName} 
                  onChange={this.handleChangeDeadline}
                  disabled={(isEdited && checked[deadlineName]) ? false : true}
                  suffixIcon={isEdited ? <CalendarOutlined /> : null}
                /> 
              </>
            )}
          </div> : null
        }
      </div>
    )
  }
}