import { ITaskMeta } from '../types/stateAndProps'
import { IAction } from '../../../types/statesAndActions'
export const initialTaskMeta = {
  hasNext: true,
  searchAfterId: '',
  searchBeforeId: '',
  total: 0,
}
export const taskMetaReducer = (state: ITaskMeta, action: IAction): ITaskMeta => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}