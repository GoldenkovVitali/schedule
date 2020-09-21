import taskTypeColors from '../configs/taskTypeColors';
import taskTypes from '../configs/TaskTypes';
import taskStructure from '../configs/taskStructure';

export default class LocalStorageSettings {

  init = () => {
    const isTaskTypes = this.check('taskTypes');
    const isTaskTypeColors = this.check('taskTypeColors');
    const istaskStructure = this.check('taskStructure');

    console.log(taskTypes, taskTypeColors, taskStructure)

    if (!isTaskTypes) {
      this.set('taskTypes', taskTypes);
    }

    if (!isTaskTypeColors) {
      this.set('taskTypeColors', taskTypeColors);
    }

    if (!istaskStructure) {
      this.set('taskStructure', taskStructure);
    }
  }

  check = (key) => {
    return localStorage[key] ? true : false;
  }

  getTaskTypeColors = () => {
    return JSON.parse(localStorage.taskTypeColors)
  }

  getTaskTypes = () => {
    return JSON.parse(localStorage.taskTypes);
  }

  getTaskStructure = () => {
    return JSON.parse(localStorage.taskStructure);
  }

  set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  addTaskType = (key, value) => {
    const newTaskTypes = this.getTaskTypes();
    newTaskTypes[key] = value;
    this.set('taskTypes', newTaskTypes)
  }

  addTaskStructure = (key, value) => {    
    const newTaskStructure = this.getTaskStructure();
    newTaskStructure[key] = newTaskStructure.default;
    this.set('taskStructure', newTaskStructure)
  }

  addTaskTypeColor = (key, value) => {
    const newTaskTypeColors = this.getTaskTypeColors();
    newTaskTypeColors[key] = value;
    this.set('taskTypeColors', newTaskTypeColors)
  }
}