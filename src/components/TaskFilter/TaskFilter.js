import React from 'react';
import {Checkbox} from 'antd';


const TaskFilter = ({ onHandleSowTaskTypes }) => {

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    onHandleSowTaskTypes(checkedValues)
  }

  const tasks = localStorage.getItem('taskTypes') || {}
  const options = Object.keys(JSON.parse(tasks));

  return (
    options.length > 0
      ? (<Checkbox.Group options={options} defaultValue={options} onChange={onChange} />)
      : null
  );
}

export default TaskFilter;

