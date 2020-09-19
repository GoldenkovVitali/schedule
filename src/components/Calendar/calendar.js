import React, { Component } from 'react';
import { Comment, Form, Button, List, Input, Checkbox } from 'antd';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

// общая дока:
//            https://fullcalendar.io/docs#toc
//            https://fullcalendar.io/docs/react


// пройтись через filter и оставить title и date
// настроить стилизацию https://fullcalendar.io/docs/event-display
const tasks = [
  { title: 'songbird', date: '2020-09-19', textColor: 'red' },
  { title: 'react', date: '2020-09-20' }
]


export default class Calendar extends Component {

  handleDateClick = (arg) => { 
     // показывать модалку исходя из даты
    console.log(arg.dateStr)
  }

  render() {
    return (
      <FullCalendar 
      initialView="dayGridMonth"
      plugins={[ dayGridPlugin, interactionPlugin ]}
      dateClick={this.handleDateClick}
      eventContent={renderEventContent}
      events={tasks}
      />
      
    );
  }
}

function renderEventContent(eventInfo) {
  //настройки у данной ячейки
  console.log(eventInfo)
  return (
    <>
      <p>{eventInfo.event.title}</p>
    </>
  )
}
