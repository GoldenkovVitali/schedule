import React from 'react';
import {Checkbox} from 'antd';
import helpers from "../../helpers/helpers";

const TaskFilter = ({ onHandleSowTaskTypes, initialData }) => {

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    onHandleSowTaskTypes(checkedValues)
  }

  const tasks = helpers.getTypesTasks(initialData)
  //const options = Object.keys(JSON.parse(tasks));

  return (
    tasks.length > 0
      ? (<Checkbox.Group options={tasks} defaultValue={tasks} onChange={onChange} />)
      : null
  );
}

export default TaskFilter;

