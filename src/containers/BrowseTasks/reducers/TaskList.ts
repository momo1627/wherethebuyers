import { ITaskList, ITaskDetail } from '../types/stateAndProps'
import { IAction } from '../../../types/statesAndActions'
export const initialTaskList = {
    taskList: [] as ITaskDetail[],
}
export const taskListReducer = (state: ITaskList, action: IAction): ITaskList => {
    switch (action.type) {
        case 'INITTASKS':
            return {
                taskList: action.payload,
            };
        case "ADDMORETASKS":
            return {
                taskList: [...state.taskList, ...action.payload],
            };
        case "ADDNEWTASKS":
            return {
                taskList: [action.payload, ...state.taskList,],
            };
        default:
            return state;
    }
}