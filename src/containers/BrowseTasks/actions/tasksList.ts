import { ITaskDetail } from '../types/stateAndProps'
export const initTaskList = (taskList: ITaskDetail[]) => {
  return {
    type: 'INITTASKS',
    payload: taskList,
  }
}
export const addNewTask = (taskList: ITaskDetail[]) => {
  return {
    type: 'ADDNEWTASKS',
    payload: taskList,
  }
}
export const addMoreTask = (taskList: ITaskDetail[]) => {
  return {
    type: 'ADDMORETASKS',
    payload: taskList,
  }
}